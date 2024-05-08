import React from "react"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../shared/ui/card"
import ProductThumbnail from "./ProductThumbnail"
import LocalizedClientLink from "../link/LocalizedClientLink"
import { Badge } from "../shared/ui/badge"

type ProductCardProps = {
  title: string | null | undefined
  collection: string | null | undefined
  thumbnail: string | null | undefined
  handle: string | null | undefined
  price: string | null | undefined
}

export default function ProductCard({
  title,
  thumbnail,
  collection,
  handle,
  price,
}: ProductCardProps) {
  if (!handle?.length || !thumbnail?.length) return null

  return (
    <LocalizedClientLink href={`/products/${handle}`} className="group">
      <Card className="h-full">
        <CardHeader className="relative m-5 overflow-hidden rounded-[var(--radius)] border bg-secondary">
          <ProductThumbnail
            className="aspect-square self-center object-scale-down p-2 duration-200 group-hover:scale-105"
            src={thumbnail}
          />
          <Badge className="absolute bottom-2 right-2">{price}</Badge>
        </CardHeader>
        <CardFooter className="flex flex-col items-start space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{collection}</CardDescription>
        </CardFooter>
      </Card>
    </LocalizedClientLink>
  )
}
