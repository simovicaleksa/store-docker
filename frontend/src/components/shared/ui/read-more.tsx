"use client"

import { cn } from "@/lib/utils"
import React, { HTMLAttributes, useEffect, useRef, useState } from "react"

interface ReadMoreProps extends HTMLAttributes<HTMLParagraphElement> {}

export default function ReadMore({
  children,
  className,
  ...rest
}: ReadMoreProps) {
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
        className="my-0 py-0 font-semibold text-muted-foreground"
        onClick={toggleOpen}
      >
        {open ? "Show less" : "Read more"}
      </button>
    </div>
  )
}
