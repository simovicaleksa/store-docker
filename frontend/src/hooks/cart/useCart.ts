"use client"

import { useCallback, useEffect, useState } from "react"
import useCountry from "../countries/useCountry"
import useAsyncLoader from "../shared/useAsyncLoader"
import { getOrSetCart } from "@/services/cart/actions"
import { CartType } from "@/types/global"
import { atom, useAtom } from "jotai"

const CartAtom = atom<CartType | null>(null)

export default function useCart() {
  const [cart, setCart] = useAtom(CartAtom)
  const { countryCode } = useCountry()
  const { isLoading, asyncLoader } = useAsyncLoader()

  const update = useCallback(async () => {
    asyncLoader(async () => {
      const cart = await getOrSetCart(countryCode)

      if (cart) setCart(cart)
    })
  }, [asyncLoader, setCart, countryCode])

  // fetch the cart using the update (cart) function
  useEffect(() => {
    update()
  }, [countryCode, update])

  return { cart, isLoading, update }
}
