import { Country } from "@medusajs/medusa"
import { getRegions } from "../region"

export async function getCountries() {
  let countries: Country[] = []
  const regions = await getRegions()

  regions.forEach((region) =>
    region.countries.forEach((country) => countries.push(country))
  )

  countries.sort((a, b) => {
    if (a.display_name > b.display_name) return 1
    if (a.display_name < b.display_name) return -1
    return 0
  })

  return countries
}
