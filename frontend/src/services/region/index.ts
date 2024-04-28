import medusa from "@/lib/medusa/client"
import { type Region } from "@medusajs/medusa"
import { cache } from "react"

export const getRegions = cache(async () => {
  let regions: Region[] = []

  try {
    const res = await medusa.regions.list()
    regions = res.regions
  } catch (e) {
    console.log(e)
  } finally {
    return regions
  }
})

export const getRegion = async (countryCode: string) => {
  const regions = await getRegions()

  return regions.find((region) =>
    region.countries.some((country) => country.iso_2 === countryCode),
  )
}
