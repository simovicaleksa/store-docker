"use client"

import { useParams } from "next/navigation"

export default function useCountry() {
  const countryCode = useParams().countryCode as string

  return { countryCode }
}
