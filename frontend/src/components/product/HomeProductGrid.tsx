import React from "react"
import ProductGrid from "../collections/ProductGrid"
import LocalizedClientLink from "../link/LocalizedClientLink"
import { Button } from "../shared/ui/button"
import { type PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { cn } from "@/lib/utils"

export default function HomeProductGrid({
  products,
  className,
}: {
  products: PricedProduct[] | undefined | null
  className?: string
}) {
  if (!products?.length) return null

  return (
    <div className={cn("mx-auto max-w-7xl p-5", className)}>
      <div className="my-5 flex flex-row justify-between">
        <h2 className="text-3xl font-bold">Browse Products</h2>
        <Button variant={"secondary"} asChild>
          <LocalizedClientLink href="/search">View all</LocalizedClientLink>
        </Button>
      </div>
      <ProductGrid className="px-5" products={products} />
    </div>
  )
}
