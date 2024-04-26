import medusa from "@/lib/medusa/client"
import medusaError from "@/utils/medusa"
import { StoreGetProductsParams } from "@medusajs/medusa"
import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { cache } from "react"

export const getProducts = cache(
  async ({ limit = 5, ...params }: StoreGetProductsParams) => {
    let response = null
    try {
      response = await medusa.products.list({ limit, ...params })
    } catch (err: any) {
      if (typeof err?.message === "string") {
        console.log(err.message)
      } else {
        console.log("Server error.")
      }
    } finally {
      return response
    }
  }
)

export const searchProducts = cache(
  async ({ ...params }: StoreGetProductsParams) => {
    const response = await medusa.products.search({ ...params })

    return response
  }
)

export const getProductByHandle = cache(
  async ({
    handle,
    ...params
  }: StoreGetProductsParams): Promise<PricedProduct[] | void> => {
    return medusa.products
      .list({ handle, ...params })
      .then(({ products }) => {
        if (!products.length) return []
        return products
      })
      .catch((err) => medusaError(err))
  }
)
