import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/shared/ui/carousel"
import { type Image } from "@medusajs/medusa"
import React, { useRef, type Dispatch, type SetStateAction } from "react"
import ProductThumbnail from "../ProductThumbnail"

type ImageGalleryProps = {
  images: Image[]
  setMainApi: Dispatch<SetStateAction<CarouselApi>>
}

export default function GalleryMain({ images, setMainApi }: ImageGalleryProps) {
  const imageRef = useRef<HTMLImageElement>(null)

  return (
    <Carousel setApi={setMainApi}>
      <CarouselContent>
        {images.map((image, idx) => (
          <CarouselItem key={idx}>
            <ProductThumbnail
              ref={imageRef}
              className="h-full w-full rounded-[var(--radius)] bg-secondary object-scale-down"
              style={{ minHeight: `${imageRef.current?.width}px` }}
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
