import React, { useState } from "react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../shared/ui/card"
import {
  CardCvcElement,
  CardExpiryElement,
  CardNumberElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"
import { Label } from "../shared/ui/label"
import { type CartType } from "@/types/cart"
import PaymentPlaceOrder from "./PaymentPlaceOrder"
import AmericanExpressIcon from "../icons/AmericanExpressIcon"
import VisaIcon from "../icons/VisaIcon"
import MastercardIcon from "../icons/MastercardIcon"
import StripeIcon from "../icons/StripeIcon"

type PaymentCardFormProps = {
  clientSecret: string
  cart: CartType
}

export default function PaymentCardForm({
  clientSecret,
  cart,
}: PaymentCardFormProps) {
  const stripe = useStripe()
  const elements = useElements()

  const [checked, setChecked] = useState<boolean>(false)

  const toggleChecked = () => setChecked((prev) => !prev)

  return (
    <Card className="mt-1 bg-secondary">
      <CardHeader>
        <CardTitle>Pay with credit card.</CardTitle>
        <CardDescription>Secure payment with Stripe.</CardDescription>
        <div className="flex flex-row flex-wrap gap-2">
          <StripeIcon size={35} />
          <VisaIcon size={35} />
          <MastercardIcon size={35} />
          <AmericanExpressIcon size={35} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-5">
          <div className="col-span-full space-y-2">
            <Label>Card number</Label>
            <CardNumberElement
              className="rounded-[var(--radius)] border-border bg-background px-5 py-3"
              options={{ showIcon: true }}
            />
          </div>
          <div className="space-y-2">
            <Label>Expiry date</Label>
            <CardExpiryElement className="rounded-[var(--radius)] border-border bg-background px-5 py-3" />
          </div>
          <div className="space-y-2">
            <Label>CVC</Label>
            <CardCvcElement className="rounded-[var(--radius)] border-border bg-background px-5 py-3" />
          </div>
        </div>
      </CardContent>
      <PaymentPlaceOrder
        checked={checked}
        toggleChecked={toggleChecked}
        stripe={stripe}
        elements={elements}
        cart={cart}
        clientSecret={clientSecret}
      />
    </Card>
  )
}
