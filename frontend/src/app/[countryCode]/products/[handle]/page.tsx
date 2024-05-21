import React from "react"
import { getProductByHandle } from "@/services/product"
import ProductDetails from "@/components/product/details/ProductDetails"
import { notFound } from "next/navigation"
import ImageGallery from "@/components/product/gallery/ImageGallery"
import type { Metadata } from "next"
import SimilarProducts from "@/components/product/SimilarProducts"

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
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-5 py-5 xl:max-w-7xl xl:flex-row">
        <ImageGallery images={product.images} className="px-5" />
        <ProductDetails
          className="h-fit w-full xl:sticky xl:top-28"
          product={product}
        />
      </section>
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5 border-t px-5 py-20 xl:max-w-7xl">
        <div>
          <h1 className="text-3xl font-semibold">You might also like:</h1>
          <p className="text-muted-foreground">
            Take a look at more of our products.
          </p>
        </div>
        <SimilarProducts collectionId={product.collection_id} />
      </section>
    </main>
  )
}
