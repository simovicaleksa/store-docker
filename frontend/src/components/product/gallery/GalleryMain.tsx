import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/shared/ui/carousel"
import { type Image } from "@medusajs/medusa"
import React, {
  useEffect,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react"
import ProductThumbnail from "../ProductThumbnail"

type ImageGalleryProps = {
  images: Image[]
  setMainApi: Dispatch<SetStateAction<CarouselApi>>
}

export default function GalleryMain({ images, setMainApi }: ImageGalleryProps) {
  const imageRef = useRef<HTMLImageElement>(null)
  const [minImageHeight, setMinImageHeight] = useState<number>(0)

  const updateImageSize = () => {
    if (imageRef.current) setMinImageHeight(imageRef.current.width)
  }

  useEffect(() => {
    updateImageSize()

    window.addEventListener("resize", updateImageSize)

    return () => {
      window.removeEventListener("resize", updateImageSize)
    }
  }, [])

  return (
    <Carousel setApi={setMainApi}>
      <CarouselContent>
        {images.map((image, idx) => (
          <CarouselItem key={idx}>
            <ProductThumbnail
              ref={imageRef}
              className="h-full w-full rounded-[var(--radius)] bg-secondary object-scale-down"
              style={{ minHeight: `${minImageHeight}px` }}
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
