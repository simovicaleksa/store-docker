"use server"

import { revalidateTag } from "next/cache"
import { cookies } from "next/headers"
import { updateCart } from "../cart"
import { StorePostCartsCartReq } from "@medusajs/medusa"
import { omit } from "lodash"
import { addShippingMethod, completeCart } from "."
import { redirect } from "next/navigation"
import medusa from "@/lib/medusa/client"
import medusaError from "@/utils/medusa"

type ShippingValues = {
  first_name: string
  last_name: string
  company?: string
  address_1: string
  address_2?: string
  postal_code: string
  city: string
  country_code: string
  province?: string
  email: string
  phone?: string
}

export async function setAddress(values: ShippingValues) {
  if (!values) return "No form data received"

  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) return { message: "No cartId cookie found" }

  const data = {
    shipping_address: omit(values, "email"),
    email: values.email,
  } as StorePostCartsCartReq

  try {
    await updateCart(cartId, data)
    revalidateTag("cart")
  } catch (error: any) {
    return error.toString()
  }
}

export async function setShippingMethod(shippingMethodId: string) {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) throw new Error("No cartId cookie found")

  try {
    await addShippingMethod({ cartId, shippingMethodId })
    revalidateTag("cart")
  } catch (error: any) {
    return error.toString()
  }
}

export async function placeOrder() {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) throw new Error("No cartId cookie found")

  let cart

  try {
    cart = await completeCart(cartId)
    revalidateTag("cart")
  } catch (error: any) {
    throw error
  }

  if (cart?.type === "order") {
    const countryCode = cart.data.shipping_address?.country_code?.toLowerCase()
    cookies().set("_medusa_cart_id", "", { maxAge: -1 })
    redirect(`/${countryCode}/order/confirmed/${cart?.data.id}`)
  }

  return cart
}

export async function createPaymentSessions(cartId: string) {
  return medusa.carts
    .createPaymentSessions(cartId)
    .then(({ cart }) => {
      revalidateTag("cart")
      return cart
    })
    .catch((err: any) => {
      console.log(err)
      return null
    })
}

export async function setPaymentSession({
  cartId,
  providerId,
}: {
  cartId: string
  providerId: string
}) {
  return medusa.carts
    .setPaymentSession(cartId, { provider_id: providerId })
    .then(({ cart }) => {
      revalidateTag("cart")
      return cart
    })
    .catch((err) => medusaError(err))
}
