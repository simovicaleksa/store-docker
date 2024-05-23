"use client"

import { type Order } from "@medusajs/medusa"
import React from "react"
import OrderItems from "./OrderItems"

type OrderTrackItemsProps = {
  order: Order
}

export default function OrderTrackItems(props: OrderTrackItemsProps) {
  return (
    <div className="mx-auto max-w-4xl">
      <OrderItems items={props.order.items} />
    </div>
  )
}
