"use client"

import React from "react"
import CountriesDialog from "../countries/CountriesDialog"
import CartSheet from "../cart/CartSheet"
import { Toaster } from "../shared/ui/toaster"

export default function Overlay() {
  return (
    <>
      <Toaster />
      <CountriesDialog />
      <CartSheet />
    </>
  )
}
