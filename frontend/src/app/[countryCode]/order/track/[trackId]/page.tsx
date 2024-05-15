import OrderTrackInfo from "@/components/order/OrderTrackInfo"
import { retrieveOrder } from "@/services/order"
import { notFound } from "next/navigation"
import React from "react"

export default async function TrackPage({
  params: { trackId },
}: {
  params: { trackId: string }
}) {
  const order = await retrieveOrder(trackId).catch(() => notFound())

  if (!order) return notFound()

  return (
    <main className="min-h-screen">
      <section className="p-5">
        <OrderTrackInfo />
      </section>
    </main>
  )
}
