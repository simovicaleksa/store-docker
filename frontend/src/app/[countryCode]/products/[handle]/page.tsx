import React from "react"
import { getProductByHandle } from "@/services/product"
import ProductDetails from "@/components/product/details/ProductDetails"
import { notFound } from "next/navigation"
import ImageGallery from "@/components/product/gallery/ImageGallery"

export default async function ProductPage({
  params: { handle },
}: {
  params: { handle: string }
}) {
  const products = await getProductByHandle({ handle })
  if (!products?.length) return notFound()
  const product = products[0]
  if (!product) return notFound()

  return (
    <main className="min-h-screen w-full">
      <section className="mx-auto flex w-full max-w-3xl flex-col gap-5 p-5 xl:max-w-7xl xl:flex-row">
        <ImageGallery images={product.images} />
        <ProductDetails
          className="h-fit w-full xl:sticky xl:top-28"
          product={product}
        />
      </section>
    </main>
  )
}
