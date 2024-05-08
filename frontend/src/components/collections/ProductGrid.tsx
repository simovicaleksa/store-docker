"use client"

import { type PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React from "react"
import ProductCard from "../product/ProductCard"
import { getCheapestProductPrice } from "@/utils/product"
import useCurrencyCode from "@/hooks/countries/useCurrencyCode"
import { cn } from "@/lib/utils"

export default function ProductGrid({
  products,
  className,
}: {
  products: PricedProduct[] | undefined | null
  className?: string
}) {
  const { currencyCode } = useCurrencyCode()

  if (!products) return null

  return (
    <div
      className={cn(
        "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4",
        className,
      )}
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          title={product.title}
          thumbnail={product.thumbnail}
          collection={product.collection?.title}
          handle={product.handle}
          price={getCheapestProductPrice(product, currencyCode)}
        />
      ))}
    </div>
  )
}
