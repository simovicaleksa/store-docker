import { type CartType } from "@/types/cart"
import React from "react"

export default function ShippingPreview({ cart }: { cart: CartType | null }) {
  return (
    <div className="grid grid-cols-2">
      <div>
        <h1 className="font-medium">Location</h1>
        <ul className="text-muted-foreground text-sm">
          <li>{cart?.shipping_address?.address_1}</li>
          <li>{cart?.shipping_address?.address_2}</li>
          <li className="uppercase">{cart?.shipping_address?.country_code}</li>
          <li>{cart?.shipping_address?.postal_code}</li>
          <li>{cart?.shipping_address?.province}</li>
        </ul>
      </div>
      <div>
        <h1 className="font-medium">Contact</h1>
        <ul className="text-muted-foreground text-sm">
          <li>{cart?.email}</li>
          <li>{cart?.shipping_address?.phone}</li>
        </ul>
      </div>
    </div>
  )
}
