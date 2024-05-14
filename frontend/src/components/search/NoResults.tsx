import { SearchX } from "lucide-react"
import React from "react"

export default function NoResults() {
  return (
    <div className="my-10 flex w-full flex-col items-center justify-center text-center text-muted-foreground">
      <SearchX className="size-16" />
      <h2 className="mt-2 text-lg font-semibold">No results found!</h2>
    </div>
  )
}
