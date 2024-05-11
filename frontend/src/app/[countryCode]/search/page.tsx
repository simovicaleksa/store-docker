import ProductGrid from "@/components/collections/ProductGrid"
import SearchInput from "@/components/search/SearchInput"
import SearchSort from "@/components/search/SearchSort"
import PagePagination from "@/components/shared/PagePagination"
import { getProducts } from "@/services/product"
import { getPagesCount } from "@/utils/pages"
import { getQuerySearchParam, getSortOrderParam } from "@/utils/search"
import { type Metadata } from "next"
import { notFound } from "next/navigation"
import React from "react"

export const metadata: Metadata = {
  title: "Search Products",
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const perPage = 20
  const offset = (Number(searchParams.page) || 1) * perPage - perPage

  const response = await getProducts({
    q: getQuerySearchParam(searchParams.query),
    order: getSortOrderParam(searchParams.sort),
    limit: perPage,
    offset,
  })

  if (!response) return notFound()

  return (
    <main className="mx-auto min-h-screen w-full max-w-7xl p-10">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Search products</h1>
        <p className="text-muted-foreground">See what products we can offer.</p>
      </div>
      <div className="flex flex-col gap-2 py-5 sm:flex-row">
        <SearchInput className="w-full" />
        <SearchSort className="w-full sm:w-[300px]" />
      </div>
      <ProductGrid products={response.products} />
      <PagePagination pages={getPagesCount(response.count, response.limit)} />
    </main>
  )
}
