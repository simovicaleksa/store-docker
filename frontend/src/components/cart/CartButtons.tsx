import React from "react"
import { SheetClose, SheetFooter } from "../shared/ui/sheet"
import { Button } from "../shared/ui/button"
import useCart from "@/hooks/cart/useCart"
import LocalizedClientLink from "../link/LocalizedClientLink"

export default function CartButtons() {
  const { cart } = useCart()

  const isEmpty = cart?.items.length === 0

  return (
    <SheetFooter className="mt-5 flex flex-col gap-2 bg-background py-5 sm:flex-row">
      <SheetClose asChild>
        <Button className="w-full" variant={"secondary"}>
          Continue shopping
        </Button>
      </SheetClose>

      {!isEmpty && (
        <SheetClose asChild>
          <Button className="w-full" asChild>
            <LocalizedClientLink href="/checkout">
              Go to checkout
            </LocalizedClientLink>
          </Button>
        </SheetClose>
      )}
    </SheetFooter>
  )
}
