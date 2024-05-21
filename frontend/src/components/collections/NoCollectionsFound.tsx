import { Shapes } from "lucide-react"
import React from "react"

export default function NoCollectionsFound() {
  return (
    <div className="mx-auto mt-10 flex w-full flex-col items-center justify-center space-y-5 p-10 text-center text-muted-foreground">
      <Shapes className="size-16" />
      <p className="text-lg font-bold">There were no collections found.</p>
    </div>
  )
}
