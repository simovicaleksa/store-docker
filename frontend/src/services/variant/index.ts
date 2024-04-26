import medusa from "@/lib/medusa/client"
import { cache } from "react"

export const getVariantById = cache(async (variantId: string) => {
  const { variant } = await medusa.products.variants.retrieve(variantId)

  return variant
})
