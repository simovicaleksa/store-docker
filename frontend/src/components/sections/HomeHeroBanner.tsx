"use client"

import React from "react"
import { Button } from "../shared/ui/button"
import LocalizedClientLink from "../link/LocalizedClientLink"
import { type PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import HomeProductCard from "./HomeProductCard"
import useTailwindBreakpoint from "@/hooks/shared/useTailwindBreakpoint"
import { env } from "@/env"

export default function HomeHeroBanner({
  product,
}: {
  product: PricedProduct | undefined | null
}) {
  const { isBreakpoint } = useTailwindBreakpoint("sm")

  const buttonSize = !isBreakpoint ? "default" : "lg"

  return (
    <div className="mx-auto flex min-h-[400px] w-full max-w-7xl items-center p-5 py-10">
      <div className="flex h-full w-full flex-col items-center space-y-14 lg:flex-row">
        <div className="flex w-full flex-col">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold lg:text-5xl">
              {env.NEXT_PUBLIC_SLOGAN}
            </h1>
            <p className="text-muted-foreground lg:text-xl">
              {/* Buying things online was never easier. */}
              {env.NEXT_PUBLIC_DESCRIPTION}
            </p>
          </div>
          <div className="mt-5 flex flex-row flex-wrap gap-2">
            <Button size={buttonSize} className="w-fit" asChild>
              <LocalizedClientLink href="/search">
                View Products
              </LocalizedClientLink>
            </Button>
            <Button
              size={buttonSize}
              variant={"outline"}
              className="w-fit"
              asChild
            >
              <LocalizedClientLink href="/collections">
                View Collections
              </LocalizedClientLink>
            </Button>
          </div>
        </div>
        <HomeProductCard product={product} />
      </div>
    </div>
  )
}
