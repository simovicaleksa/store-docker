"use client"

import { usePathname } from "next/navigation"
import useCountry from "../countries/useCountry"

export function useCurrentPath() {
  const { countryCode } = useCountry()
  const pathname = usePathname()

  const currentPath = pathname.split(countryCode).slice(1).join(countryCode)

  return { currentPath }
}
