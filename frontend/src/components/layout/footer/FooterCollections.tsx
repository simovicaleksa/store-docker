import { type ProductCollection } from "@medusajs/medusa"
import React from "react"
import FooterLink from "./FooterLink"

export default function FooterCollections(props: {
  collections: ProductCollection[] | undefined | null
}) {
  if (!props.collections?.length) return null

  return (
    <div className="w-full space-y-3">
      <h1 className="text-xl font-semibold">Collections</h1>
      <ul className="space-y-1">
        {props.collections.map((collection) => (
          <FooterLink
            key={collection.id}
            href={`/collections/${collection.handle}`}
          >
            {collection.title}
          </FooterLink>
        ))}
      </ul>
    </div>
  )
}
