"use client"

import useCurrencyCode from "@/hooks/countries/useCurrencyCode"
import { CartType } from "@/types/global"
import { formatAmount } from "@/utils/prices"
import React from "react"

export default function DeliveryPreview({ cart }: { cart: CartType | null }) {
  const { currencyCode } = useCurrencyCode()

  if (!cart?.shipping_methods.length) {
    return (
      <div className="grid grid-cols-2">
        <div>
          <h1 className="font-medium">Method</h1>
          <ul className="text-sm text-muted-foreground">
            <li>No information provider.</li>
          </ul>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2">
      <div>
        <h1 className="font-medium">Method</h1>
        <ul className="text-sm text-muted-foreground">
          <li>{cart?.shipping_methods[0].shipping_option.name}</li>
        </ul>
      </div>
      <div>
        <h1 className="font-medium">Cost</h1>
        <ul className="text-sm text-muted-foreground">
          <li>
            {formatAmount(
              cart?.shipping_methods[0].price,
              currencyCode,
              "Free"
            )}
          </li>
        </ul>
      </div>
    </div>
  )
}
