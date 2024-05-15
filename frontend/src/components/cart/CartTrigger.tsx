"use client"

import React from "react"
import { Button } from "../shared/ui/button"
import { ShoppingCart } from "lucide-react"
import useCartSheet from "@/hooks/cart/useCartSheet"
import useCart from "@/hooks/cart/useCart"
import { Badge } from "../shared/ui/badge"

export default function CartTrigger() {
  const { setOpen } = useCartSheet()
  const { cart } = useCart()
  const cartItems = cart?.items.length ?? 0

  function handleOpen() {
    setOpen(true)
  }

  return (
    <div className="relative">
      {cartItems ? (
        <Badge className="pointer-events-none absolute right-0 aspect-square size-fit min-h-0 min-w-0 rounded-full p-1 text-[10px]">
          {cartItems}
        </Badge>
      ) : null}
      <Button
        variant={"ghost"}
        size={"icon"}
        aria-label="open cart"
        onClick={handleOpen}
      >
        <ShoppingCart />
      </Button>
    </div>
  )
}
