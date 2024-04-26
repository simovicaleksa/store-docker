import { LineItem } from "@medusajs/medusa"
import { ReactNode, createContext } from "react"

export const LineItemContext = createContext<LineItem>({} as LineItem)

export function LineItemProvider({
  value,
  children,
}: {
  value: LineItem
  children: ReactNode
}) {
  return (
    <LineItemContext.Provider value={value}>
      {children}
    </LineItemContext.Provider>
  )
}
