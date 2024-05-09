import React from "react"
import ProductGrid from "../collections/ProductGrid"
import LocalizedClientLink from "../link/LocalizedClientLink"
import { Button } from "../shared/ui/button"
import { type PricedProduct } from "@medusajs/medusa/dist/types/pricing"

export default function HomeProductGrid({
  products,
}: {
  products: PricedProduct[] | undefined | null
}) {
  if (!products?.length) return null

  const splicedProducts = products.splice(1)

  return (
    <div className="mx-auto max-w-7xl p-5">
      <div className="my-5 flex flex-row justify-between">
        <h2 className="text-3xl font-bold">Browse Products</h2>
        <Button variant={"secondary"} asChild>
          <LocalizedClientLink href="/search">View all</LocalizedClientLink>
        </Button>
      </div>
      <ProductGrid products={splicedProducts} />
    </div>
  )
}
