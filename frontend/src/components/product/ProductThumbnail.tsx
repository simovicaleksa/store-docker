import Image, { type ImageProps } from "next/image"
import React, { type ForwardedRef, forwardRef } from "react"

interface ProductThumbnailProps extends Omit<ImageProps, "alt" | "src"> {
  width?: number
  height?: number
  src: string | undefined | null
}

const ProductThumbnail = forwardRef(function ProductThumbnail(
  { src, width = 500, height = 500, ...rest }: ProductThumbnailProps,
  ref: ForwardedRef<HTMLImageElement>,
) {
  if (!src) return null

  return (
    <Image
      ref={ref}
      src={src}
      width={width}
      height={height}
      alt="product thumbnail"
      {...rest}
    />
  )
})

export default ProductThumbnail
