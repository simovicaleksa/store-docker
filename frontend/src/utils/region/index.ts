const regionName = new Intl.DisplayNames(["en"], {
  type: "region",
})

export function getCountryName(countryCode: string) {
  if (!countryCode) return ""

  return regionName.of(countryCode.toUpperCase()) // must call toUpperCase() because chrome is the worst browser
}
