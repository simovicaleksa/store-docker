"use client"

import { getCountries } from "@/services/countries"
import { Country } from "@medusajs/medusa"
import { useEffect, useState } from "react"
import useAsyncLoader from "../shared/useAsyncLoader"

export default function useCountries() {
  const [countries, setCountries] = useState<Country[]>([])
  const { isLoading, asyncLoader } = useAsyncLoader()

  useEffect(() => {
    asyncLoader(async () => {
      const countries = await getCountries()
      setCountries(countries)
    })
  }, [asyncLoader])

  return { isLoading, countries }
}
