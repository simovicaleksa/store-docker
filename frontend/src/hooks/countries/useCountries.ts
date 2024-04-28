"use client"

import { getCountries } from "@/services/countries"
import { type Country } from "@medusajs/medusa"
import { useEffect, useState } from "react"
import useAsyncLoader from "../shared/useAsyncLoader"

export default function useCountries() {
  const [countries, setCountries] = useState<Country[]>([])
  const { isLoading, asyncLoader } = useAsyncLoader()

  useEffect(() => {
    asyncLoader(async () => {
      const countries = await getCountries()
      setCountries(countries)
    }).catch((e) => console.log(e))
  }, [asyncLoader])

  return { isLoading, countries }
}
