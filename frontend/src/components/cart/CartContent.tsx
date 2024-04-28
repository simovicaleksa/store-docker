import React from "react"
import CartItem from "./item/CartItem"
import { BoxSelect } from "lucide-react"
import { type CartType } from "@/types/cart"
import CartSummary from "./CartSummary"

export default function CartContent({ cart }: { cart: CartType | null }) {
  const sortedCartItems = cart?.items.sort((a, b) => {
    if (a.title > b.title) return 1
    if (a.title < b.title) return -1
    return 0
  })

  if (typeof sortedCartItems?.length !== "number") return null

  // if cart is empty
  if (sortedCartItems.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10">
        <BoxSelect className="size-16" />
        <h2 className="mt-2 text-2xl font-bold">Your cart is empty</h2>
        <p className="text-muted-foreground">Add items to your cart.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-10">
      {sortedCartItems.map((item) => (
        <CartItem lineItem={item} key={item.id} />
      ))}
      <CartSummary cart={cart} />
    </div>
  )
}
