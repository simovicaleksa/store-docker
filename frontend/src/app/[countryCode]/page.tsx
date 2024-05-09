import FeaturedCollections from "@/components/product/FeaturedCollections"
import HomeProductGrid from "@/components/product/HomeProductGrid"
import HomeHeroBanner from "@/components/sections/HomeHeroBanner"
import { getCollections } from "@/services/collection"
import { getProducts } from "@/services/product"
import React from "react"

export default async function HomePage() {
  const collectionResponse = await getCollections({ limit: 3 })
  const productsResponse = await getProducts({ limit: 9 })

  return (
    <main className="min-h-screen w-full">
      <section className="mb-10 w-full bg-secondary">
        <HomeHeroBanner product={productsResponse?.products[0]} />
      </section>
      <section className="mx-auto w-full max-w-7xl p-5">
        <FeaturedCollections collections={collectionResponse?.collections} />
      </section>
      <section className="w-full bg-gradient-to-b from-secondary/10 via-secondary to-secondary/10">
        <HomeProductGrid products={productsResponse?.products} />
      </section>
      <section className="bg-secondary"></section>
      <section></section>
    </main>
  )
}
