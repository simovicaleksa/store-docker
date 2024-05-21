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
import { cn } from "@/lib/utils"

type ProductCardProps = {
  title: string | null | undefined
  collection: string | null | undefined
  thumbnail: string | null | undefined
  handle: string | null | undefined
  price: string | null | undefined
  noEvents?: boolean
  className?: string
}

export default function ProductCard({
  title,
  thumbnail,
  collection,
  handle,
  price,
  noEvents,
  className,
}: ProductCardProps) {
  if (!handle?.length || !thumbnail?.length) return null

  return (
    <LocalizedClientLink
      href={`/products/${handle}`}
      noEvents={noEvents}
      className="group"
    >
      <Card className={cn("h-full", className)}>
        <CardHeader className="relative m-5 overflow-hidden rounded-[var(--radius)] border bg-secondary">
          <ProductThumbnail
            className="aspect-square self-center object-scale-down p-2 duration-200 group-hover:scale-105"
            src={thumbnail}
          />
          <Badge className="pointer-events-none absolute bottom-2 right-2 bg-foreground text-background">
            {price}
          </Badge>
        </CardHeader>
        <CardFooter className="flex flex-col items-start space-y-1">
          <CardTitle>{title}</CardTitle>
          <CardDescription>{collection}</CardDescription>
        </CardFooter>
      </Card>
    </LocalizedClientLink>
  )
}
