import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/shared/ui/carousel"
import { type Image } from "@medusajs/medusa"
import React, { type Dispatch, type SetStateAction } from "react"
import ProductThumbnail from "../ProductThumbnail"
import { Button } from "@/components/shared/ui/button"
import { cn } from "@/lib/utils"

type ImageGalleryProps = {
  images: Image[]
  mainApi: CarouselApi
  thumbsApi: CarouselApi
  setThumbsApi: Dispatch<SetStateAction<CarouselApi>>
  selected: number
}

export default function GalleryThumbs({
  images,
  mainApi,
  thumbsApi,
  setThumbsApi,
  selected,
}: ImageGalleryProps) {
  const onThumbClick = (id: number) => {
    if (!mainApi || !thumbsApi) {
      return
    }

    mainApi.scrollTo(id)
  }

  return (
    <Carousel opts={{ dragFree: true, align: "center" }} setApi={setThumbsApi}>
      <CarouselContent>
        {images.map((image, idx) => (
          <CarouselItem
            className="basis-2/5 rounded-[var(--radius)] md:basis-1/4"
            key={idx}
          >
            <Button variant={"ghost"} asChild onClick={() => onThumbClick(idx)}>
              <ProductThumbnail
                className={cn("h-full w-full cursor-pointer object-cover", {
                  "opacity-70": idx !== selected,
                })}
                src={image.url}
                width={1200}
                height={1200}
                priority={idx === 0}
              />
            </Button>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselNext
        className="absolute right-2 disabled:pointer-events-auto"
        onClick={() => onThumbClick(selected + 1)}
      />
      <CarouselPrevious
        className="absolute left-2 disabled:pointer-events-auto"
        onClick={() => onThumbClick(selected - 1)}
      />
    </Carousel>
  )
}
