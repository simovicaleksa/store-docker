import { cn } from "@/lib/utils"
import React from "react"
import ReactCountryFlag, {
  type ReactCountryFlagProps,
} from "react-country-flag"

export default function Flag({
  countryCode,
  className,
  ...rest
}: ReactCountryFlagProps) {
  if (!countryCode) return null

  return (
    <ReactCountryFlag
      className={cn("mx-2", className)}
      countryCode={countryCode.toUpperCase()}
      {...rest}
    />
  )
}
