"use client"

import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import React from "react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../shared/ui/carousel"
import ProductCard from "./ProductCard"
import useCurrencyCode from "@/hooks/countries/useCurrencyCode"
import { getCheapestProductPrice } from "@/utils/product"

type ProductCarouselProps = {
  products: PricedProduct[]
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const { currencyCode, isLoading } = useCurrencyCode()

  if (isLoading) return null

  return (
    <Carousel opts={{ dragFree: true }}>
      <CarouselContent>
        {products.map((product, idx) => (
          <CarouselItem
            key={idx}
            className="basis-10/12 sm:basis-7/12 md:basis-5/12 lg:basis-4/12 xl:basis-1/4"
          >
            <ProductCard
              title={product.title}
              thumbnail={product.thumbnail}
              collection={product.collection?.title}
              handle={product.handle}
              price={getCheapestProductPrice(product, currencyCode)}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden xl:flex" />
      <CarouselNext className="hidden xl:flex" />
    </Carousel>
  )
}
