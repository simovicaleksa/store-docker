"use client"

import { cn } from "@/lib/utils"
import React, { type HTMLAttributes, useRef, useState } from "react"

export default function ReadMore({
  children,
  className,
  ...rest
}: HTMLAttributes<HTMLParagraphElement>) {
  const [open, setOpen] = useState<boolean>(false)
  const paragraphRef = useRef<HTMLParagraphElement>(null)

  const toggleOpen = () => setOpen((prev) => !prev)

  return (
    <div>
      <p
        className={cn("line-clamp-2", { "line-clamp-none": open }, className)}
        ref={paragraphRef}
        {...rest}
      >
        {children}
      </p>
      <button
        className="text-muted-foreground my-0 py-0 font-semibold"
        onClick={toggleOpen}
      >
        {open ? "Show less" : "Read more"}
      </button>
    </div>
  )
}
