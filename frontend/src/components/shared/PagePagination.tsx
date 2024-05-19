"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect } from "react"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"
import { Button } from "./ui/button"
import useCreateQueryString from "@/hooks/shared/useCreateQueryString"

export default function PagePagination({ pages }: { pages: number }) {
  const pagesArray = Array.from({ length: pages }, (_, index) => index + 1)

  const pathname = usePathname()
  const searchParams = useSearchParams()
  const router = useRouter()
  const { createQueryString } = useCreateQueryString()

  function getPageUrl(page: number) {
    return pathname + "?" + createQueryString("page", String(page))
  }

  const page = parseInt(searchParams.get("page") ?? "0")
  const nextPage = getPageUrl(page + 1)
  const prevPage = getPageUrl(page - 1)

  // generate page search param if it does not already exist
  useEffect(() => {
    if (!searchParams.has("page")) {
      router.replace(pathname + "?" + createQueryString("page", "1"), {
        scroll: false,
      })
    }
  }, [searchParams, createQueryString, pathname, router])

  const previewPages = 1
  const nextPages = pagesArray
    .slice(page, pagesArray.length)
    .slice(0, previewPages)
  const prevPages = pagesArray
    .slice(0, page - 1)
    .reverse()
    .slice(0, previewPages)
    .reverse()

  if (pages === 0) return null

  return (
    <Pagination className="my-10 w-fit">
      <PaginationContent>
        <Button
          disabled={page === 1}
          variant={"ghost"}
          className="hidden px-0 sm:flex"
        >
          <PaginationItem>
            <PaginationPrevious href={prevPage} />
          </PaginationItem>
        </Button>

        {page - 1 > previewPages && (
          <PaginationItem key={1}>
            <PaginationLink href={getPageUrl(1)}>1</PaginationLink>
          </PaginationItem>
        )}

        {prevPages.length &&
        !prevPages.includes(2) &&
        Number(prevPages.at(0)) > previewPages ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}

        {prevPages.map((pageIdx) => (
          <PaginationItem key={pageIdx}>
            <PaginationLink href={getPageUrl(pageIdx)}>
              {pageIdx}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationLink href="#" isActive>
            {page}
          </PaginationLink>
        </PaginationItem>

        {nextPages.map((pageIdx) => (
          <PaginationItem key={pageIdx}>
            <PaginationLink href={getPageUrl(pageIdx)}>
              {pageIdx}
            </PaginationLink>
          </PaginationItem>
        ))}

        {nextPages.length &&
        !nextPages.includes(pages - 1) &&
        Number(nextPages.at(0)) < pages ? (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        ) : null}

        {pages - page > previewPages && (
          <PaginationItem key={pages}>
            <PaginationLink href={getPageUrl(pages)}>{pages}</PaginationLink>
          </PaginationItem>
        )}

        <Button
          disabled={page === pagesArray.length}
          variant={"ghost"}
          className="hidden px-0 sm:flex"
        >
          <PaginationItem>
            <PaginationNext href={nextPage} />
          </PaginationItem>
        </Button>
      </PaginationContent>
    </Pagination>
  )
}
