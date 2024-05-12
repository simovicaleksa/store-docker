import React from "react"
import { getProductByHandle } from "@/services/product"
import ProductDetails from "@/components/product/details/ProductDetails"
import { notFound } from "next/navigation"
import ImageGallery from "@/components/product/gallery/ImageGallery"
import type { Metadata } from "next"

type Props = {
  params: { handle: string }
}

export async function generateMetadata({
  params: { handle },
}: Props): Promise<Metadata> {
  let title = "Product Page"
  let images: string[] = []

  const products = await getProductByHandle({ handle })
  if (products?.length) {
    const product = products[0]

    title = `${product?.title}`
    images = product?.thumbnail ? [product.thumbnail] : []
  }

  return {
    title,
    openGraph: {
      images: images,
    },
  }
}

export default async function ProductPage({ params: { handle } }: Props) {
  const products = await getProductByHandle({ handle })
  if (!products?.length) return notFound()
  const product = products[0]
  if (!product) return notFound()

  return (
    <main className="min-h-screen w-full">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-10 py-5 xl:max-w-7xl xl:flex-row">
        <ImageGallery images={product.images} />
        <ProductDetails
          className="h-fit w-full xl:sticky xl:top-28"
          product={product}
        />
      </section>
    </main>
  )
}
