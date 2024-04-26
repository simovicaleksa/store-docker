"use client"

import React from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../shared/ui/dropdown-menu"
import { Button } from "../shared/ui/button"
import { Globe, Settings } from "lucide-react"
import useCountriesDialog from "@/hooks/countries/useCountriesDialog"
import Flag from "../shared/ui/flag"
import useCountry from "@/hooks/countries/useCountry"

export default function SettingsDropdown() {
  const { setOpen } = useCountriesDialog()
  const openCountryDialog = () => setOpen(true)
  const { countryCode } = useCountry()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={"ghost"} size={"icon"} aria-label="open settings">
          <Settings />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Country & Region</DropdownMenuLabel>
        <DropdownMenuItem onClick={openCountryDialog}>
          <Globe className="mr-2 size-4" />
          Shipping to <Flag countryCode={countryCode} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
