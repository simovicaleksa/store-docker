import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/shared/ui/carousel"
import { Image } from "@medusajs/medusa"
import React, { Dispatch, SetStateAction } from "react"
import ProductThumbnail from "../ProductThumbnail"

type ImageGalleryProps = {
  images: Image[]
  setMainApi: Dispatch<SetStateAction<CarouselApi>>
}

export default function GalleryMain({ images, setMainApi }: ImageGalleryProps) {
  return (
    <Carousel setApi={setMainApi}>
      <CarouselContent>
        {images.map((image, idx) => (
          <CarouselItem key={idx}>
            <ProductThumbnail
              className="h-full w-full rounded-[var(--radius)] bg-secondary object-scale-down"
              src={image.url}
              width={700}
              height={700}
              priority={idx === 0}
            />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}
