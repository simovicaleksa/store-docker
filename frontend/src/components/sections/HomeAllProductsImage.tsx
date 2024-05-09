"use client"

import { type PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React from "react"
import ProductCard from "../product/ProductCard"
import { getCheapestProductPrice } from "@/utils/product"
import useCurrencyCode from "@/hooks/countries/useCurrencyCode"

export default function HomeAllProductsImage({
  products,
}: {
  products: PricedProduct[] | undefined | null
}) {
  const { currencyCode } = useCurrencyCode()

  if (!products?.length) return null

  const splicedProducts = Array.from([...products])
    .reverse()
    .slice(0, 3)

  return (
    <ul className="hidden h-[600px] w-full flex-col items-center justify-center lg:flex">
      {splicedProducts.map((product) => (
        <li
          key={product.id}
          className="absolute first:z-10 first:-translate-y-48 first:translate-x-10 first:rotate-3 last:z-30 last:translate-y-48 last:-rotate-6 even:z-20 even:translate-x-32"
        >
          <ProductCard
            collection={product.collection?.title}
            title={product.title}
            handle={product.handle}
            price={getCheapestProductPrice(product, currencyCode)}
            thumbnail={product.thumbnail}
            className="h-fit max-w-64"
          />
        </li>
      ))}
    </ul>
  )
}
