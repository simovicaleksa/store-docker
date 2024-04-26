"use client"

import useCartSheet from "@/hooks/cart/useCartSheet"
import React from "react"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "../shared/ui/sheet"
import CartContent from "./CartContent"
import CartButtons from "./CartButtons"
import useCart from "@/hooks/cart/useCart"

export default function CartSheet() {
  const { open, setOpen } = useCartSheet()
  const { cart } = useCart()

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="overflow-y-scroll sm:max-w-md">
        <SheetHeader className="mb-10 items-start space-y-0 text-start">
          <SheetTitle>Your cart</SheetTitle>
          <SheetDescription>Manage items in your cart.</SheetDescription>
        </SheetHeader>
        <CartContent cart={cart} />
        <CartButtons />
      </SheetContent>
    </Sheet>
  )
}
