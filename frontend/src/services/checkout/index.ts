import medusa from "@/lib/medusa/client"
import medusaError from "@/utils/medusa"
import { cache } from "react"

export async function addShippingMethod({
  cartId,
  shippingMethodId,
}: {
  cartId: string
  shippingMethodId: string
}) {
  return medusa.carts
    .addShippingMethod(cartId, { option_id: shippingMethodId })
    .then(({ cart }) => cart)
    .catch((err) => medusaError(err))
}

export const listShippingMethods = cache(async function listShippingMethods(
  regionId: string,
  productIds?: string[],
) {
  const product_ids = productIds?.join(",")

  return medusa.shippingOptions
    .list({
      region_id: regionId,
      product_ids,
    })
    .then(({ shipping_options }) => shipping_options)
    .catch((err) => {
      console.log(err)
      return null
    })
})

export async function completeCart(cartId: string) {
  return medusa.carts
    .complete(cartId)
    .then((res) => res)
    .catch((err) => medusaError(err))
}
