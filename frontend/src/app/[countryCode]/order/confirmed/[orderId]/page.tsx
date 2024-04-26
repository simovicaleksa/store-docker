import OrderDelivery from "@/components/order/OrderDelivery"
import OrderItems from "@/components/order/OrderItems"
import OrderPayment from "@/components/order/OrderPayment"
import OrderTotal from "@/components/order/OrderTotal"
import { Separator } from "@/components/shared/ui/separator"
import { retrieveOrder } from "@/services/order"
import { Metadata } from "next"
import { notFound } from "next/navigation"
import React from "react"

export const metadata: Metadata = {
  title: "Order Confirmed",
  description: "You purchase was successful",
}

export default async function OrderConfirmed({
  params: { orderId },
}: {
  params: { orderId: string }
}) {
  const order = await retrieveOrder(orderId)

  if (!order) return notFound()

  const date = new Date(order.created_at)
    .toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "2-digit",
    })
    .replace(/,/g, "")

  return (
    <main className="mx-auto w-full max-w-4xl space-y-10 p-5">
      <div className="space-y-0">
        <h1 className="text-3xl font-semibold">Thank you!</h1>
        <h2 className="text-xl">Your order was placed successfully.</h2>
      </div>
      <div className="space-y-3 text-sm">
        <p>
          We have sent the order confirmation details to{" "}
          <span className="font-medium">{order.email}</span>.
        </p>
        <p>Order date: {date}</p>
        <p className="text-blue-600">Order number: {order.display_id}</p>
      </div>
      <OrderItems items={order.items} />
      <OrderTotal order={order} />
      <Separator className="my-10" />
      <OrderDelivery order={order} />
      <OrderPayment order={order} />
    </main>
  )
}
