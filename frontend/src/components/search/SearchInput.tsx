"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation"
import React, { ChangeEvent, useEffect, useState } from "react"
import { Input } from "../shared/ui/input"
import { SearchIcon } from "lucide-react"
import useCreateQueryString from "@/hooks/shared/useCreateQueryString"
import { cn } from "@/lib/utils"

export default function SearchInput(props: { className?: string }) {
  const { createQueryString } = useCreateQueryString()
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchQuery, setSearchQuery] = useState<string>("")

  function onSearchChange(e: ChangeEvent<HTMLInputElement>) {
    setSearchQuery(e.target.value)
  }

  useEffect(() => {
    if (searchParams.has("query")) {
      const query = searchParams.get("query")
      if (typeof query === "string") setSearchQuery(query)
    }
  }, [searchParams])

  useEffect(() => {
    router.replace(pathname + "?" + createQueryString("query", searchQuery))
  }, [router, pathname, createQueryString, searchQuery])

  return (
    <div
      className={cn(
        "relative flex h-fit flex-row items-center",
        props.className
      )}
    >
      <SearchIcon className="pointer-events-none absolute size-5 translate-x-3 text-muted-foreground" />
      <Input
        value={searchQuery}
        onChange={(e) => onSearchChange(e)}
        placeholder="Search for products..."
        className="w-full pl-11"
      />
    </div>
  )
}
