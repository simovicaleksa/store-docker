import React from "react"
import CheckoutCart from "./CheckoutCart"
import CheckoutTotal from "./CheckoutTotal"
import { type CartType } from "@/types/cart"
import { Card, CardHeader, CardTitle } from "@/components/shared/ui/card"

export default function CheckoutInfo({ cart }: { cart: CartType | null }) {
  return (
    <Card className="bg-secondary flex h-fit w-full flex-col lg:sticky lg:top-24 lg:max-w-md">
      <CardHeader>
        <CardTitle>Order summary</CardTitle>
      </CardHeader>
      <CheckoutCart cart={cart} />
      <CheckoutTotal cart={cart} />
    </Card>
  )
}
