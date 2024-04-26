import { Circle } from "lucide-react"
import React from "react"

type RadioRingProps = {
  isSelected: boolean
}

export default function RadioRing({ isSelected }: RadioRingProps) {
  return (
    <span className="flex aspect-square h-4 w-4 items-center justify-center rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50">
      {isSelected && <Circle className="size-2.5 fill-current text-current" />}
    </span>
  )
}
