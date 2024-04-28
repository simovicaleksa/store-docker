import { type Order } from "@medusajs/medusa"
import React from "react"

export default function OrderDelivery({ order }: { order: Order }) {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-medium">Delivery details</h2>
      <div className="grid grid-cols-2">
        <div>
          <h3 className="font-medium">Shipping</h3>
          <ul className="text-muted-foreground text-sm">
            <li className="uppercase">{order.shipping_address.country_code}</li>
            <li>{order.shipping_address.city}</li>
            <li>{order.shipping_address.province}</li>
            <li>{order.shipping_address.postal_code}</li>
            <li>{order.shipping_address.address_1}</li>
          </ul>
        </div>
        <div>
          <h3 className="font-medium">Contact</h3>
          <ul className="text-muted-foreground text-sm">
            <li>{order.email}</li>
            <li>{order.shipping_address.phone}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
