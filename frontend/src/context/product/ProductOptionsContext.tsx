import { ProductOptionValue } from "@medusajs/medusa"
import { Dispatch, ReactNode, SetStateAction, createContext } from "react"

type ProductOptionsContextType = {
  options: ProductOptionValue[]
  setOptions: Dispatch<SetStateAction<ProductOptionValue[]>>
}

export const ProductOptionsContext = createContext<ProductOptionsContextType>(
  {} as ProductOptionsContextType
)

export function ProductOptionsProvider({
  value,
  children,
}: {
  value: ProductOptionsContextType
  children: ReactNode
}) {
  return (
    <ProductOptionsContext.Provider value={value}>
      {children}
    </ProductOptionsContext.Provider>
  )
}
