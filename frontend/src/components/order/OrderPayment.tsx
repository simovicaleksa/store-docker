import { formatStatus } from "@/utils/order"
import { type Order } from "@medusajs/medusa"
import React from "react"

export default function OrderPayment({ order }: { order: Order }) {
  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-medium">Delivery details</h2>
      <div className="grid grid-cols-2">
        <div>
          <h3 className="font-medium">Payment status</h3>
          <ul className="text-muted-foreground text-sm">
            <li>{formatStatus(order.payment_status)}</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
