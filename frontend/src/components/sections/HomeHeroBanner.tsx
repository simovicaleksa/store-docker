import React from "react"
import { Button } from "../shared/ui/button"
import LocalizedClientLink from "../link/LocalizedClientLink"
import { type PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import HomeProductCard from "./HomeProductCard"

export default function HomeHeroBanner({
  product,
}: {
  product: PricedProduct | undefined | null
}) {
  return (
    <div className="mx-auto flex min-h-[400px] w-full max-w-7xl items-center p-5 py-10">
      <div className="flex h-full w-full flex-col items-center space-y-14 lg:flex-row">
        <div className="flex w-full flex-col">
          <div>
            <h1 className="text-4xl font-bold">Shopping is better with us!</h1>
            <p className="text-muted-foreground">
              Buying things online was never easier.
            </p>
          </div>
          <Button className="mt-5 w-fit" asChild>
            <LocalizedClientLink href="/search">
              View Products
            </LocalizedClientLink>
          </Button>
        </div>
        <HomeProductCard product={product} />
      </div>
    </div>
  )
}
