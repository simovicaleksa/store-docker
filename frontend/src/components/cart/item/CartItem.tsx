"use client"

import { type LineItem } from "@medusajs/medusa"
import React from "react"
import ProductThumbnail from "../../product/ProductThumbnail"
import { formatAmount } from "@/utils/prices"
import useCurrencyCode from "@/hooks/countries/useCurrencyCode"
import { LineItemProvider } from "@/context/lineItem/LineItemContext"
import ItemQuantity from "./ItemQuantity"

type CartItemProps = {
  lineItem: LineItem
}

export default function CartItem({ lineItem }: CartItemProps) {
  const { currencyCode } = useCurrencyCode()
  const price = formatAmount(lineItem.total, currencyCode)

  return (
    <LineItemProvider value={lineItem}>
      <div className="flex flex-row gap-2">
        <div className="flex w-40 flex-col">
          <ProductThumbnail
            src={lineItem.thumbnail}
            width={120}
            height={120}
            className="h-full w-full rounded-[var(--radius)] border bg-secondary p-2"
          />
          <ItemQuantity />
        </div>
        <div className="flex w-full flex-col">
          <h2 className="text-lg font-bold">{lineItem.title}</h2>
          <span className="font-semibold">{price}</span>
          <span className="text-sm text-muted-foreground">
            {lineItem.variant.title}
          </span>
        </div>
      </div>
    </LineItemProvider>
  )
}
