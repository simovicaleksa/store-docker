import React from "react"
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import { type CartType } from "@/types/cart"
import { STRIPE_PUBLISH_KEY } from "@/constants/payment"
import PaymentCardForm from "./PaymentCardForm"

const stripePromise = loadStripe(STRIPE_PUBLISH_KEY)

export default function PaymentStripeWrapper({ cart }: { cart: CartType }) {
  const clientSecret =
    typeof cart?.payment_session?.data.client_secret === "string"
      ? cart.payment_session.data.client_secret
      : null

  return (
    <div>
      {clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
          }}
        >
          <PaymentCardForm clientSecret={clientSecret} cart={cart} />
        </Elements>
      )}
    </div>
  )
}
