import medusa from "@/lib/medusa/client"
import { cache } from "react"

export const getRegions = cache(async () => {
  const { regions } = await medusa.regions.list()

  return regions
})

export const getRegion = async (countryCode: string) => {
  const regions = await getRegions()

  return regions.find((region) =>
    region.countries.some((country) => country.iso_2 === countryCode)
  )
}
