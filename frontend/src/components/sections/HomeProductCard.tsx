"use client"

import { type PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React from "react"
import ProductCard from "../product/ProductCard"
import useCurrencyCode from "@/hooks/countries/useCurrencyCode"
import { getCheapestProductPrice } from "@/utils/product"

export default function HomeProductCard({
  product,
}: {
  product: PricedProduct | undefined | null
}) {
  const { currencyCode } = useCurrencyCode()

  if (!product) return null

  return (
    <ProductCard
      title={product.title}
      price={getCheapestProductPrice(product, currencyCode)}
      collection={product.collection?.title}
      handle={product.handle}
      thumbnail={product.thumbnail}
    />
  )
}
