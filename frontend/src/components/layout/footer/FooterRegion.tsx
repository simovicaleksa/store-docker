"use client"

import { Button } from "@/components/shared/ui/button"
import Flag from "@/components/shared/ui/flag"
import { Label } from "@/components/shared/ui/label"
import useCountriesDialog from "@/hooks/countries/useCountriesDialog"
import useCountry from "@/hooks/countries/useCountry"
import { getCountryName } from "@/utils/region"
import React from "react"

export default function FooterRegion() {
  const { countryCode } = useCountry()
  const { setOpen } = useCountriesDialog()

  function handleClick() {
    setOpen(true)
  }

  return (
    <div className="w-full">
      <h1 className="mb-3 text-xl font-semibold">Country & Region</h1>
      <div className="flex flex-grow-0 flex-col">
        <Label className="mb-3">Shipping to</Label>
        <Button variant={"outline"} onClick={handleClick}>
          {`${getCountryName(countryCode)}`}
          <Flag countryCode={countryCode} />
        </Button>
        <p className="mt-3 text-sm text-muted-foreground">
          Select your shipping region for more accurate prices.
        </p>
      </div>
    </div>
  )
}
