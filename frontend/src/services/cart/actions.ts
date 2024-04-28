"use server"

import { cookies } from "next/headers"
import {
  addItem,
  createCart,
  getCart,
  removeItem,
  updateCart,
  updateItem,
} from "."
import { getRegion } from "../region"
import { revalidateTag } from "next/cache"

export async function getOrSetCart(countryCode: string) {
  const cartId = cookies().get("_medusa_cart_id")?.value
  let cart

  if (cartId) {
    cart = await getCart(cartId).then((cart) => cart)
  }

  const region = await getRegion(countryCode)

  if (!region) {
    return null
  }

  const region_id = region.id

  if (!cart) {
    cart = await createCart({ region_id }).then((res) => res)
    cart &&
      cookies().set("_medusa_cart_id", cart.id, {
        maxAge: 60 * 60 * 24 * 7,
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production",
      })
    revalidateTag("cart")
  }

  if (cart && cart?.region_id !== region_id) {
    await updateCart(cart.id, { region_id })
    revalidateTag("cart")
  }

  return cart
}

export async function retrieveCart() {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  try {
    const cart = await getCart(cartId).then((cart) => cart)
    return cart
  } catch (e) {
    console.log(e)
    return null
  }
}

export async function addToCart({
  variantId,
  quantity,
  countryCode,
}: {
  variantId: string
  quantity: number
  countryCode: string
}) {
  const cart = await getOrSetCart(countryCode).then((cart) => cart)

  if (!cart) {
    return "Missing cart ID"
  }

  if (!variantId) {
    return "Missing product variant ID"
  }

  try {
    await addItem({ cartId: cart.id, variantId, quantity })
    revalidateTag("cart")
  } catch (e) {
    return "Error adding item to cart"
  }
}

export async function updateLineItem({
  lineId,
  quantity,
}: {
  lineId: string
  quantity: number
}) {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return "Missing cart ID"
  }

  if (!lineId) {
    return "Missing lineItem ID"
  }

  if (!cartId) {
    return "Missing cart ID"
  }

  try {
    await updateItem({ cartId, lineId, quantity })
    revalidateTag("cart")
  } catch (e) {
    return String(e)
  }
}

export async function deleteLineItem(lineId: string) {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return "Missing cart ID"
  }

  if (!lineId) {
    return "Missing lineItem ID"
  }

  if (!cartId) {
    return "Missing cart ID"
  }

  try {
    await removeItem({ cartId, lineId })
    revalidateTag("cart")
  } catch (e) {
    return "Error deleting line item"
  }
}
