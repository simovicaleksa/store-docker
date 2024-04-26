"use client"

import React, { useEffect, useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../shared/ui/card"
import {
  PricedProduct,
  PricedVariant,
} from "@medusajs/medusa/dist/types/pricing"
import ProductThumbnail from "../ProductThumbnail"
import { getCheapestProductPrice } from "@/utils/product"
import useCurrencyCode from "@/hooks/countries/useCurrencyCode"
import { ProductOptionValue } from "@medusajs/medusa"
import { ProductOptionsProvider } from "@/context/product/ProductOptionsContext"
import { ProductVariantProvider } from "@/context/product/ProductVariantContext"
import { getProductVariantByOptions, getVariantPrice } from "@/utils/variant"
import SelectOptions from "./SelectOptions"
import ProductAddToCart from "./ProductAddToCart"

type ProductDetailsProps = {
  product: PricedProduct
  className?: string
}

export default function ProductDetails({
  product,
  className,
}: ProductDetailsProps) {
  const { currencyCode } = useCurrencyCode()
  const cheapestPrice = getCheapestProductPrice(product, currencyCode)

  const [options, setOptions] = useState<ProductOptionValue[]>([])
  const [variant, setVariant] = useState<PricedVariant | null>(null)

  // try to find a variant with the selected options and set variant state
  useEffect(() => {
    const selectedVariant = getProductVariantByOptions(options, product)
    if (!selectedVariant) {
      setVariant(null)
      return
    }

    setVariant(selectedVariant)
  }, [options, product])

  return (
    <ProductOptionsProvider value={{ options, setOptions }}>
      <ProductVariantProvider value={{ variant, setVariant }}>
        <Card className={className}>
          <CardHeader>
            <div className="flex flex-row gap-5">
              <ProductThumbnail
                className="hidden aspect-square rounded-[var(--radius)] bg-secondary object-scale-down p-3 md:flex"
                src={product.thumbnail}
                width={120}
                height={120}
              />
              <div className="flex flex-col gap-2">
                <div className="space-y-1">
                  <CardTitle>{product.title}</CardTitle>
                  <CardDescription>{product.collection?.title}</CardDescription>
                </div>

                <span className="text-xl font-bold leading-none tracking-tight">
                  {variant
                    ? getVariantPrice(variant, currencyCode)
                    : cheapestPrice}
                </span>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-5">
            <p className="text-muted-foreground">{product.description}</p>
            <SelectOptions options={product.options} />
          </CardContent>
          <CardFooter>
            <ProductAddToCart optionsCount={product.options?.length || 0} />
          </CardFooter>
        </Card>
      </ProductVariantProvider>
    </ProductOptionsProvider>
  )
}
