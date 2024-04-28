import medusa from "@/lib/medusa/client"
import { type PricedVariant } from "@medusajs/medusa/dist/types/pricing"
import { cache } from "react"

export const getVariantById = cache(async (variantId: string) => {
  let variant: PricedVariant | null = null

  try {
    const res = await medusa.products.variants.retrieve(variantId)
    variant = res.variant
  } catch (e) {
    console.log(e)
  } finally {
    return variant
  }
})
