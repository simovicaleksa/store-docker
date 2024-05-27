"use client"

import { type PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React, { useEffect, useState } from "react"
import ProductCard from "../product/ProductCard"
import { getCheapestProductPrice } from "@/utils/product"
import useCurrencyCode from "@/hooks/countries/useCurrencyCode"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import ProductListCard from "../product/ProductListCard"

export default function ProductGrid({
  products,
  className,
}: {
  products: PricedProduct[] | undefined | null
  className?: string
}) {
  const [viewType, setViewType] = useState<"grid" | "list">("grid")
  const searchParams = useSearchParams()
  const { currencyCode } = useCurrencyCode()

  useEffect(() => {
    if (searchParams.has("view")) {
      const view = searchParams.get("view")
      if (typeof view === "string") {
        if (view === "grid" || view === "list") {
          setViewType(view)
        }
      }
    }
  }, [searchParams])

  if (!products) return null

  if (viewType === "list") {
    return (
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {products.map((product) => (
          <ProductListCard
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
