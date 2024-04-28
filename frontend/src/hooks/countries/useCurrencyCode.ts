"use client"

import { useEffect, useState } from "react"
import useCountry from "./useCountry"
import useAsyncLoader from "../shared/useAsyncLoader"
import { getRegion } from "@/services/region"

export default function useCurrencyCode() {
  const [currencyCode, setCurrencyCode] = useState("")
  const { countryCode } = useCountry()
  const { isLoading, asyncLoader } = useAsyncLoader()

  useEffect(() => {
    asyncLoader(async () => {
      const region = await getRegion(countryCode)
      if (!region?.currency_code.length) return

      setCurrencyCode(region.currency_code)
    }).catch((e) => console.log(e))
  }, [asyncLoader, countryCode])

  return { currencyCode, isLoading }
}
