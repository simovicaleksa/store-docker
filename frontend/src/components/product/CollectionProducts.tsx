import React from "react"
import { ProductCollection } from "@medusajs/medusa"
import { getProducts } from "@/services/product"
import ProductCarousel from "./ProductCarousel"
import { Button } from "../shared/ui/button"
import LocalizedClientLink from "../link/LocalizedClientLink"
import { Tag } from "lucide-react"
import { Separator } from "../shared/ui/separator"

type CollectionProductsProps = {
  collection: ProductCollection
}

export default async function CollectionProducts({
  collection,
}: CollectionProductsProps) {
  const response = await getProducts({ collection_id: [collection.id] })

  if (!response?.products.length) return null

  return (
    <>
      <div className="space-y-5">
        <div className="flex flex-row items-center justify-between">
          <h2 className="flex flex-row items-center text-xl font-bold md:text-2xl">
            <Tag className="mr-2 size-5" />
            {collection.title}
          </h2>
          <Button variant={"secondary"} size={"sm"} asChild>
            <LocalizedClientLink href={`/collections/${collection.handle}`}>
              View all
            </LocalizedClientLink>
          </Button>
        </div>
        <ProductCarousel products={response.products} />
      </div>
      <Separator className="last:hidden" />
    </>
  )
}
