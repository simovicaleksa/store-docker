import { ProductOptionValue } from "@medusajs/medusa"
import React, { use, useMemo } from "react"
import { Button } from "../../shared/ui/button"
import { ProductOptionsContext } from "@/context/product/ProductOptionsContext"

type ProductOptionValues = {
  values: ProductOptionValue[]
}

export default function ProductOptionValues({ values }: ProductOptionValues) {
  const { options, setOptions } = use(ProductOptionsContext)

  const addOption = (item: ProductOptionValue) =>
    setOptions((prev) => [
      ...prev.filter(
        (selectedItem) => selectedItem.option_id !== item.option_id
      ),
      item,
    ])

  const removeOption = (item: ProductOptionValue) =>
    setOptions((prev) => prev.filter((option) => option.value !== item.value))

  const isSelected = (item: ProductOptionValue) =>
    options.some((someOption) => someOption.value === item.value)

  const handleClick = (item: ProductOptionValue) =>
    isSelected(item) ? removeOption(item) : addOption(item)

  const onlyUnique = useMemo(
    () =>
      values.filter(
        (item, id, array) =>
          array.findIndex((val) => val.value === item.value) === id
      ),
    [values]
  )

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {onlyUnique.map((item) => (
        <Button
          variant={isSelected(item) ? "default" : "outline"}
          key={item.id}
          onClick={() => handleClick(item)}
        >
          {item.value}
        </Button>
      ))}
    </div>
  )
}
