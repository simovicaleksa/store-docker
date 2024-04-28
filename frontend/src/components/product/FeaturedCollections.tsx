import { type ProductCollection } from "@medusajs/medusa"
import React from "react"
import CollectionProducts from "./CollectionProducts"

type FeaturedCollectionsProps = {
  collections: ProductCollection[] | undefined | null
}

export default function FeaturedCollections({
  collections,
}: FeaturedCollectionsProps) {
  if (!collections?.length) return null

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Featured collections</h1>
        <p className="text-muted-foreground">
          Browse featured product collections.
        </p>
      </div>
      {collections.map((collection) => (
        <CollectionProducts collection={collection} key={collection.id} />
      ))}
    </div>
  )
}
