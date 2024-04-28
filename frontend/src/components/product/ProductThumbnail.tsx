import Image, { type ImageProps } from "next/image"
import React from "react"

interface ProductThumbnailProps extends Omit<ImageProps, "alt" | "src"> {
  width?: number
  height?: number
  src: string | undefined | null
}

export default function ProductThumbnail({
  src,
  width = 500,
  height = 500,
  ...rest
}: ProductThumbnailProps) {
  if (!src) return null

  return (
    <Image
      src={src}
      width={width}
      height={height}
      alt="product thumbnail"
      {...rest}
    />
  )
}
