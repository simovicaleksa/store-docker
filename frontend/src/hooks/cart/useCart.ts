"use client"

import { useCallback, useEffect } from "react"
import useCountry from "../countries/useCountry"
import useAsyncLoader from "../shared/useAsyncLoader"
import { getOrSetCart } from "@/services/cart/actions"
import { type CartType } from "@/types/cart"
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
    }).catch((e) => console.log(e))
  }, [asyncLoader, setCart, countryCode])

  // fetch the cart using the update (cart) function
  useEffect(() => {
    update().catch((e) => console.log(e))
  }, [countryCode, update])

  return { cart, isLoading, update }
}
