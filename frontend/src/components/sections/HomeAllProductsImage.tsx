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
    <ul className="flex h-[600px] w-full flex-col items-center justify-center">
      {splicedProducts.map((product) => (
        <li
          key={product.id}
          className="absolute mt-20 first:z-10 first:-translate-x-12 first:-translate-y-40 first:-rotate-6 last:z-30 last:translate-y-40 last:rotate-[9deg] even:z-20 even:translate-x-16 sm:mt-32 sm:first:-translate-x-32 sm:even:translate-x-32 sm:even:rotate-3 lg:mt-0 lg:first:-translate-y-48 lg:first:translate-x-10 lg:first:rotate-3 lg:last:translate-y-48 lg:last:-rotate-6 lg:even:translate-x-32"
        >
          <ProductCard
            collection={product.collection?.title}
            title={product.title}
            handle={product.handle}
            price={getCheapestProductPrice(product, currencyCode)}
            thumbnail={product.thumbnail}
            className="h-fit max-w-48 sm:max-w-64"
          />
        </li>
      ))}
    </ul>
  )
}
