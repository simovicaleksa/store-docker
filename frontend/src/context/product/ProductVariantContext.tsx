import { PricedVariant } from "@medusajs/medusa/dist/types/pricing"
import { Dispatch, ReactNode, SetStateAction, createContext } from "react"

type ProductVariantContextType = {
  variant: PricedVariant | null
  setVariant: Dispatch<SetStateAction<PricedVariant | null>>
}

export const ProductVariantContext = createContext<ProductVariantContextType>(
  {} as ProductVariantContextType
)

export function ProductVariantProvider({
  value,
  children,
}: {
  value: ProductVariantContextType
  children: ReactNode
}) {
  return (
    <ProductVariantContext.Provider value={value}>
      {children}
    </ProductVariantContext.Provider>
  )
}
