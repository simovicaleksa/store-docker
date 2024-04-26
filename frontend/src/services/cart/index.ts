import medusa from "@/lib/medusa/client"
import medusaError from "@/utils/medusa"
import { StorePostCartsCartReq } from "@medusajs/medusa"
import { cache } from "react"

export async function createCart(data = {}) {
  return medusa.carts
    .create(data)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err)
      return null
    })
}

export async function updateCart(cartId: string, data: StorePostCartsCartReq) {
  return medusa.carts
    .update(cartId, data)
    .then(({ cart }) => cart)
    .catch((error) => medusaError(error))
}

export const getCart = cache(async function (cartId: string) {
  return medusa.carts
    .retrieve(cartId)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err)
      return null
    })
})

export async function addItem({
  cartId,
  variantId,
  quantity,
}: {
  cartId: string
  variantId: string
  quantity: number
}) {
  return medusa.carts.lineItems
    .create(cartId, { variant_id: variantId, quantity })
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err)
      return null
    })
}

export async function updateItem({
  cartId,
  lineId,
  quantity,
}: {
  cartId: string
  lineId: string
  quantity: number
}) {
  return medusa.carts.lineItems
    .update(cartId, lineId, { quantity })
    .then(({ cart }) => cart)
    .catch((err) => medusaError(err))
}

export async function removeItem({
  cartId,
  lineId,
}: {
  cartId: string
  lineId: string
}) {
  return medusa.carts.lineItems
    .delete(cartId, lineId)
    .then(({ cart }) => cart)
    .catch((err) => {
      console.log(err)
      return null
    })
}
