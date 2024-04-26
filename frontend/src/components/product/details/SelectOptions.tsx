import { ProductOption } from "@medusajs/medusa"
import React from "react"
import ProductOptionValues from "./ProductOptionValues"

type SelectOptionsProps = {
  options: ProductOption[] | null | undefined
}

export default function SelectOptions({ options }: SelectOptionsProps) {
  if (!options?.length) return null

  return (
    <div className="flex flex-col gap-5">
      {options.map((option) => (
        <div className="flex flex-col gap-3" key={option.id}>
          <h3 className="text-xl font-semibold">{`Select ${option.title.toLowerCase()}`}</h3>
          <ProductOptionValues values={option.values} />
        </div>
      ))}
    </div>
  )
}
