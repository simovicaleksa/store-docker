"use client"

import useCreateQueryString from "@/hooks/shared/useCreateQueryString"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../shared/ui/select"

export default function SearchSort(props: { className?: string }) {
  const { createQueryString } = useCreateQueryString()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [sortBy, setSortBy] = useState<string>("")

  function onSortByChange(s: string) {
    setSortBy(s)
  }

  useEffect(() => {
    if (searchParams.has("sort")) {
      const sort = searchParams.get("sort")
      if (typeof sort === "string" && sort) setSortBy(sort)
    }
  }, [searchParams])

  useEffect(() => {
    router.replace(pathname + "?" + createQueryString("sort", sortBy))
  }, [router, pathname, createQueryString, sortBy])

  return (
    <Select onValueChange={(s) => onSortByChange(s)} value={sortBy}>
      <SelectTrigger className={props.className}>
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Sort by</SelectLabel>
          <SelectItem value="price_desc">Price descending</SelectItem>
          <SelectItem value="price_asc">Price ascending</SelectItem>
          <SelectItem value="newest">Newest</SelectItem>
          <SelectItem value="oldest">Oldest</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
