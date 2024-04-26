import { cn } from "@/lib/utils"
import React, { HTMLAttributes } from "react"

interface AsteriskProps extends HTMLAttributes<HTMLSpanElement> {}

export default function Asterisk({ className, ...rest }: AsteriskProps) {
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
