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

export default function ViewType(props: { className?: string }) {
  const { createQueryString } = useCreateQueryString()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [viewType, setViewType] = useState<"grid" | "list">("grid")

  function onSortByChange(s: string) {
    if (typeof s === "string") {
      if (s === "grid" || s === "list") setViewType(s)
    }
  }

  useEffect(() => {
    if (searchParams.has("view")) {
      const view = searchParams.get("view")
      if (typeof view === "string") {
        if (view === "grid" || view === "list") setViewType(view)
      }
    }
  }, [searchParams])

  useEffect(() => {
    router.replace(pathname + "?" + createQueryString("view", viewType), {
      scroll: false,
    })
  }, [router, pathname, createQueryString, viewType])

  return (
    <Select onValueChange={(s) => onSortByChange(s)} value={viewType}>
      <SelectTrigger className={props.className}>
        <SelectValue placeholder="View" />
      </SelectTrigger>
      <SelectContent
        ref={(ref) => {
          if (!ref) return
          ref.ontouchstart = (e) => {
            e.preventDefault()
          }
        }}
      >
        <SelectGroup>
          <SelectLabel>View</SelectLabel>
          <SelectItem value="grid">Grid view</SelectItem>
          <SelectItem value="list">List view</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
