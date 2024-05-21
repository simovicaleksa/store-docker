import { getProducts } from "@/services/product"
import React from "react"
import ProductCarousel from "./ProductCarousel"

export default async function SimilarProducts({
  collectionId,
}: {
  collectionId: string | null | undefined
}) {
  const res = await getProducts({
    limit: 6,
    collection_id: collectionId ? [collectionId] : [],
  })

  if (!res?.products.length) {
    return (
      <p className="py-5 text-lg text-muted-foreground">
        No similar products found.
      </p>
    )
  }

  return <ProductCarousel products={res?.products} />
}
