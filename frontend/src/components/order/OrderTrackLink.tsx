"use client"

import { type Fulfillment } from "@medusajs/medusa"
import React from "react"
import { Button } from "../shared/ui/button"

type OrderTrackLinkProps = {
  fulfillments: Fulfillment[]
  fulfillment_status: string | undefined | null
}

export default function OrderTrackLink(props: OrderTrackLinkProps) {
  const trackingLink = props.fulfillments[0]?.tracking_links[0]?.tracking_number

  const noTrackingLink = !!(
    props.fulfillment_status === "shipped" && !trackingLink
  )

  function handleLinkClick() {
    window.open(String(trackingLink), "_blank", "noopener,noreferrer")
  }

  return (
    <div className="space-y-2">
      <Button onClick={() => handleLinkClick()} disabled={!trackingLink}>
        Track shipment
      </Button>
      {noTrackingLink && (
        <p className="text-sm text-muted-foreground">
          Tracking is not available for this order.
        </p>
      )}
      {props.fulfillment_status !== "shipped" && (
        <p className="text-sm text-muted-foreground">
          You will be able to track your order after it has been shipped.
        </p>
      )}
    </div>
  )
}
