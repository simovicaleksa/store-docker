import ProductGrid from "@/components/collections/ProductGrid"
import SearchInput from "@/components/search/SearchInput"
import SearchSort from "@/components/search/SearchSort"
import PagePagination from "@/components/shared/PagePagination"
import { getCollections } from "@/services/collection"
import { getProducts } from "@/services/product"
import { getPagesCount } from "@/utils/pages"
import { getQuerySearchParam, getSortOrderParam } from "@/utils/search"
import { notFound } from "next/navigation"
import React from "react"

export default async function CollectionPage({
  params: { handle },
  searchParams: { page, query, sort },
}: {
  params: { handle: string }
  searchParams: Record<string, string | string[] | undefined>
}) {
  const perPage = 20
  const offset = (Number(page) || 1) * perPage - perPage

  const response = await getCollections({ limit: 1, handle: [handle] })
  const collectionId = response?.collections[0]?.id

  if (!response) return notFound()

  if (!collectionId) return notFound()

  const productsResponse = await getProducts({
    collection_id: [collectionId],
    limit: perPage,
    offset,
    q: getQuerySearchParam(query),
    order: getSortOrderParam(sort),
  })

  if (!productsResponse) return notFound()

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl p-5">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">
          Search {response.collections[0]?.title.toLowerCase()}
        </h1>
        <p className="text-muted-foreground">See what products we can offer.</p>
      </div>
      <div className="flex flex-col gap-2 py-5 sm:flex-row">
        <SearchInput className="w-full" />
        <SearchSort className="w-full sm:w-[300px]" />
      </div>
      <ProductGrid products={productsResponse?.products} />
      <PagePagination
        pages={getPagesCount(productsResponse.count, productsResponse.limit)}
      />
    </main>
  )
}
