import { getCountryName } from "@/utils/region"
import { type Payment, type Address, type Fulfillment } from "@medusajs/medusa"
import React from "react"
import { Alert, AlertDescription, AlertTitle } from "../shared/ui/alert"
import { CreditCard, Truck } from "lucide-react"
import { getFulfillmentStatusDescription } from "@/utils/order"
import OrderTrackLink from "./OrderTrackLink"

type OrderInfoProps = {
  created_at: Date | null | undefined
  address: Address | null | undefined
  payments: Payment[]
  payment_status: string | null | undefined
  fulfillments: Fulfillment[]
  fulfillment_status: string | undefined | null
}

export default function OrderInfo(props: OrderInfoProps) {
  const date = new Date(props.created_at ?? "")
    .toLocaleDateString("en-US", {
      year: "numeric",
      month: "numeric",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      timeZoneName: "short",
    })
    .replace(/,/g, "")

  const paymentProvider = props.payments[0]?.provider_id ?? "manual"

  const paymentStatus =
    paymentProvider === "manual" && props.fulfillment_status === "captured"
      ? "Pay upon delivery"
      : props.payment_status

  return (
    <div className="mx-auto max-w-4xl">
      <h2 className="text-3xl font-semibold">Order info</h2>
      <ul className="mt-5 text-muted-foreground">
        <li>Created at: {date}</li>
        <li>
          Shipping to: {getCountryName(props.address?.country_code ?? "")}
        </li>
      </ul>
      <div className="flex flex-col gap-2 py-5">
        <Alert>
          <CreditCard className="size-5" />
          <AlertTitle>Payment Status</AlertTitle>
          <AlertDescription className="capitalize underline">
            {paymentStatus}
          </AlertDescription>
        </Alert>
        <Alert>
          <Truck className="size-5" />
          <AlertTitle>Shipping Status</AlertTitle>
          <AlertDescription>
            {getFulfillmentStatusDescription(props.fulfillment_status)}
          </AlertDescription>
        </Alert>
      </div>
      <OrderTrackLink
        fulfillments={props.fulfillments}
        fulfillment_status={props.fulfillment_status}
      />
    </div>
  )
}
