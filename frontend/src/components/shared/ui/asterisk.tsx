import { cn } from "@/lib/utils"
import React, { type HTMLAttributes } from "react"

export default function Asterisk({
  className,
  ...rest
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn("text-red-600", className)}
      aria-label="required"
      {...rest}
    >
      {"*"}
    </span>
  )
}
