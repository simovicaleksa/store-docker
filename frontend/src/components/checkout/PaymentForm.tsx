"use client"

import { type CartType } from "@/types/cart"
import React, { use, useEffect, useState } from "react"
import useAsyncLoader from "@/hooks/shared/useAsyncLoader"
import LoadingButton from "../shared/ui/loading-button"
import { CheckoutContext } from "@/context/checkout/CheckoutContext"
import PaymentRadioButton from "./PaymentRadioButton"
import { setPaymentSession } from "@/services/checkout/actions"
import { toast } from "../shared/ui/use-toast"

export default function PaymentForm({ cart }: { cart: CartType }) {
  const [selected, setSelected] = useState<string | null | undefined>(null)
  const { isLoading, asyncLoader } = useAsyncLoader()
  const { setCompletedSteps, setCurrentStep, completedSteps } =
    use(CheckoutContext)

  useEffect(() => {
    if (typeof cart?.payment_session?.provider_id === "string") {
      setSelected(cart.payment_session.provider_id)
    } else {
      setSelected(cart.payment_sessions[0]?.provider_id)
    }
  }, [cart])

  useEffect(() => {
    asyncLoader(async () => {
      if (!selected) return null
      try {
        await setPaymentSession({
          cartId: cart.id,
          providerId: selected,
        })
      } catch (err) {
        console.log(err)
        toast({
          title: "Try different payment method.",
          description:
            "Payment method selection failed. Try a different method or contact customer support for help.",
          variant: "destructive",
        })
        return null
      }
    }).catch((e) => console.log(e))
  }, [asyncLoader, selected, cart.id])

  function onSubmit() {
    asyncLoader(async () => {
      if (!completedSteps.includes("payment")) {
        setCompletedSteps((prev) => [...prev, "payment"])
      }
      setCurrentStep("review")
    }).catch((e) => console.log(e))
  }

  return (
    <div className="flex flex-col gap-2">
      {cart.payment_sessions
        .sort((a, b) => (a.provider_id > b.provider_id ? 1 : -1))
        .map((paymentSession) => (
          <PaymentRadioButton
            isLoading={isLoading}
            selected={selected}
            setSelected={setSelected}
            paymentSession={paymentSession}
            cart={cart}
            key={paymentSession.id}
          />
        ))}

      {cart.payment_session?.provider_id !== "stripe" && (
        <LoadingButton
          className="w-fit"
          isLoading={isLoading}
          onClick={onSubmit}
          disabled={!selected || isLoading}
        >
          Continue to review
        </LoadingButton>
      )}
    </div>
  )
}
