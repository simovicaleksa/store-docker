import OrderTrackItems from "@/components/order/OrderTrackItems"
import { retrieveOrder } from "@/services/order"
import { notFound } from "next/navigation"
import React from "react"
import OrderInfo from "@/components/order/OrderInfo"

export default async function TrackPage({
  params: { trackId },
}: {
  params: { trackId: string }
}) {
  const order = await retrieveOrder(trackId).catch(() => notFound())

  if (!order) return notFound()

  return (
    <main className="min-h-screen">
      <section className="p-5 pt-10">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold">Your order</h1>
          <p className="text-muted-foreground">
            Follow the status and track your order.
          </p>
        </div>
      </section>
      <section className="p-5">
        <OrderInfo
          address={order.shipping_address}
          created_at={order.created_at}
          payments={order.payments}
          payment_status={order.payment_status}
          fulfillments={order.fulfillments}
          fulfillment_status={order.fulfillment_status}
        />
      </section>
      <section className="p-5">
        <OrderTrackItems order={order} />
      </section>
    </main>
  )
}
