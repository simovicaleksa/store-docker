import FeaturedCollections from "@/components/product/FeaturedCollections"
import { getCollections } from "@/services/collection"
import React from "react"

export default async function HomePage() {
  const response = await getCollections({ limit: 3 })

  return (
    <main className="min-h-screen w-full">
      <section className="mx-auto w-full max-w-7xl p-5">
        <FeaturedCollections collections={response?.collections} />
      </section>
    </main>
  )
}
