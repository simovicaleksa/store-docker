import CollectionGrid from "@/components/collections/CollectionGrid"
import PagePagination from "@/components/shared/PagePagination"
import { getCollections } from "@/services/collection"
import { getPagesCount } from "@/utils/pages"
import { notFound } from "next/navigation"
import React from "react"

export default async function CollectionsPage({
  searchParams: { page },
}: {
  searchParams: Record<string, string | string[] | undefined>
}) {
  const perPage = 20
  const offset = (Number(page) || 1) * perPage - perPage

  const response = await getCollections({
    limit: perPage,
    offset,
  })

  if (!response) return notFound()

  return (
    <main className="mx-auto w-full max-w-7xl space-y-10 p-5">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Collections</h1>
        <p className="text-muted-foreground">Browse product collections.</p>
      </div>
      <CollectionGrid collections={response?.collections} />
      <PagePagination pages={getPagesCount(response?.count, response?.limit)} />
    </main>
  )
}
