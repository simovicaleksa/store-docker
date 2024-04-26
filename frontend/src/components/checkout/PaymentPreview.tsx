import { paymentInfoMap } from "@/constants/payment"
import { CartType } from "@/types/global"
import React from "react"

export default function PaymentPreview({ cart }: { cart: CartType | null }) {
  const providerId = cart?.payment_session?.provider_id
  const label = paymentInfoMap[providerId || "manual"].title

  return (
    <div className="grid grid-cols-2">
      <div>
        <h1 className="font-medium">Method</h1>
        <ul className="text-sm text-muted-foreground">
          <li>{label}</li>
        </ul>
      </div>
    </div>
  )
}
