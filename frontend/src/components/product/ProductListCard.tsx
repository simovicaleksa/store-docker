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

export default function ProductListCard({
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
      <Card
        className={cn(
          "flex h-full flex-row gap-0 duration-200 group-hover:bg-secondary",
          className,
        )}
      >
        <CardHeader className="relative my-5 ml-5 max-w-32 overflow-hidden rounded-[var(--radius)] border bg-secondary p-2">
          <ProductThumbnail
            className="aspect-square self-center object-scale-down duration-500"
            src={thumbnail}
          />
          <Badge className="pointer-events-none absolute bottom-2 right-2 bg-foreground text-background">
            {price}
          </Badge>
        </CardHeader>
        <CardFooter className="my-5 flex flex-col items-start space-y-1 pl-5">
          <CardTitle className="line-clamp-2 text-lg font-bold">
            {title}
          </CardTitle>
          <CardDescription>{collection}</CardDescription>
        </CardFooter>
      </Card>
    </LocalizedClientLink>
  )
}
