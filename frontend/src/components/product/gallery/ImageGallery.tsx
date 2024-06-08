"use client"

import { type Image } from "@medusajs/medusa"
import React, { useCallback, useEffect, useState } from "react"
import GalleryMain from "./GalleryMain"
import GalleryThumbs from "./GalleryThumbs"
import { type CarouselApi } from "@/components/shared/ui/carousel"
import { cn } from "@/lib/utils"

type ImageGalleryProps = {
  images: Image[] | undefined
  className?: string
}

export default function ImageGallery({ images, className }: ImageGalleryProps) {
  const [mainApi, setMainApi] = useState<CarouselApi>()
  const [thumbsApi, setThumbsApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState<number>(0)

  const onSelect = useCallback(() => {
    if (!mainApi || !thumbsApi) {
      return
    }

    setSelected(mainApi.selectedScrollSnap())
    thumbsApi.scrollTo(mainApi.selectedScrollSnap())
  }, [mainApi, thumbsApi, setSelected])

  useEffect(() => {
    if (!mainApi) {
      return
    }

    onSelect()
    mainApi.on("select", onSelect)
    mainApi.on("reInit", onSelect)
  }, [mainApi, onSelect])

  if (!images?.length) return null

  return (
    <div className={cn("w-full space-y-2", className)}>
      <GalleryMain images={images} setMainApi={setMainApi} />
      <GalleryThumbs
        images={images}
        mainApi={mainApi}
        thumbsApi={thumbsApi}
        setThumbsApi={setThumbsApi}
        selected={selected}
      />
    </div>
  )
}
