import { type ProductCollection } from "@medusajs/medusa"
import React from "react"
import CollectionCard from "./CollectionCard"
import NoCollectionsFound from "./NoCollectionsFound"

export default function CollectionGrid(props: {
  collections: ProductCollection[] | undefined | null
}) {
  if (!props.collections?.length) return <NoCollectionsFound />

  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {props.collections.map((collection) => (
        <CollectionCard collection={collection} key={collection.id} />
      ))}
    </div>
  )
}
