"use client"

import React from "react"
import useCurrencyCode from "@/hooks/countries/useCurrencyCode"
import { formatAmount } from "@/utils/prices"
import ProductThumbnail from "@/components/product/ProductThumbnail"
import { CartType } from "@/types/global"

export default function CheckoutCart({ cart }: { cart: CartType | null }) {
  const { currencyCode } = useCurrencyCode()

  return (
    <div className="mb-5 flex flex-col gap-2 p-3 lg:p-5">
      {cart?.items.map((item) => (
        <div className="flex flex-row justify-between" key={item.id}>
          <div className="flex flex-row space-x-3">
            <ProductThumbnail
              className="rounded-[var(--radius)] border bg-secondary object-scale-down p-2"
              width={100}
              height={100}
              src={item.thumbnail}
            />
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">{item.title}</h1>
              <p className="text-sm text-muted-foreground">
                {item.variant.title}
              </p>
            </div>
          </div>
          <div className="flex flex-col items-end p-2 text-end">
            <span className="text-sm text-muted-foreground">{`${item.quantity}x ${formatAmount(item.unit_price, currencyCode, "Get a quote")}`}</span>
            <span className="font-semibold">{`${formatAmount(item.total, currencyCode)}`}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
