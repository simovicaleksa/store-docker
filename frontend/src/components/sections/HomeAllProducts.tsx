import React from "react"
import { Button } from "../shared/ui/button"
import LocalizedClientLink from "../link/LocalizedClientLink"
import { type PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import HomeAllProductsImage from "./HomeAllProductsImage"
import { plusPattern } from "@/constants/patterns"

export default function HomeAllProducts({
  products,
}: {
  products: PricedProduct[] | undefined | null
}) {
  return (
    <div
      style={{ backgroundImage: plusPattern }}
      className="bg- mx-auto my-20 flex min-h-[300px] max-w-7xl flex-col space-y-5 p-5 lg:flex-row"
    >
      <div className="flex w-full flex-col items-center justify-center text-center lg:items-start lg:text-start">
        <h2 className="text-3xl font-bold">View All Products</h2>
        <p className="text-muted-foreground">{`Didn't find what you were looking for?`}</p>
        <Button className="mt-5 w-fit" asChild>
          <LocalizedClientLink href="/search">
            Browse Products
          </LocalizedClientLink>
        </Button>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <HomeAllProductsImage products={products} />
      </div>
    </div>
  )
}
