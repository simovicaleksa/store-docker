"use client"

import React from "react"
import { Button } from "../shared/ui/button"
import { ShoppingCart } from "lucide-react"
import useCartSheet from "@/hooks/cart/useCartSheet"

export default function CartTrigger() {
  const { setOpen } = useCartSheet()

  function handleOpen() {
    setOpen(true)
  }

  return (
    <Button
      variant={"ghost"}
      size={"icon"}
      aria-label="open cart"
      onClick={handleOpen}
    >
      <ShoppingCart />
    </Button>
  )
}
