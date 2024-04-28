"use client"

import { type PricedShippingOption } from "@medusajs/medusa/dist/types/pricing"
import React, { type FormEvent, use, useEffect, useState } from "react"
import { Button } from "../shared/ui/button"
import { formatAmount } from "@/utils/prices"
import useCurrencyCode from "@/hooks/countries/useCurrencyCode"
import RadioRing from "../shared/ui/radio-ring"
import LoadingButton from "../shared/ui/loading-button"
import { setShippingMethod } from "@/services/checkout/actions"
import { CheckoutContext } from "@/context/checkout/CheckoutContext"
import { toast } from "../shared/ui/use-toast"
import { type CartType } from "@/types/cart"

export default function DeliveryForm({
  availableShippingMethods,
  cart,
}: {
  availableShippingMethods: PricedShippingOption[]
  cart: CartType | null
}) {
  const { currencyCode } = useCurrencyCode()
  const { setCompletedSteps, setCurrentStep, completedSteps } =
    use(CheckoutContext)

  const [selected, setSelected] = useState<string | null>(
    cart?.shipping_methods[0]?.id ?? null,
  )
  const [loading, setLoading] = useState<boolean>(false)

  useEffect(() => {
    if (!cart?.shipping_methods.length) return
    setSelected(String(cart.shipping_methods[0]?.shipping_option_id))
  }, [cart?.shipping_methods])

  function handleSelectMethod(methodId: string | undefined | null) {
    if (!methodId) return null
    setSelected(methodId)
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()

    if (!selected) {
      setLoading(false)
      return null
    }
    const error = await setShippingMethod(selected)

    if (error) {
      toast({
        title: error,
        description:
          "Something went wrong. Contact customer support or try again later.",
        variant: "destructive",
      })
      return null
    }

    if (!completedSteps.includes("delivery")) {
      setCompletedSteps((prev) => [...prev, "delivery"])
    }
    setCurrentStep("payment")
    setLoading(false)
  }

  return (
    <form onSubmit={(e) => onSubmit(e)} className="grid grid-cols-1 space-y-2">
      {availableShippingMethods.map((method) => {
        if (!method.id) return null
        return (
          <Button
            disabled={loading}
            key={method.id}
            variant={"outline"}
            onClick={() => handleSelectMethod(method.id)}
            type="button"
            className="py-7"
          >
            <div className="flex w-full cursor-pointer flex-row items-center justify-between">
              <div className="flex w-fit flex-row items-center space-x-2">
                <RadioRing isSelected={method.id === selected} />
                <span>{method.name}</span>
              </div>
              <span className="text-muted-foreground text-sm">
                {formatAmount(method.amount, currencyCode, "Free")}
              </span>
            </div>
          </Button>
        )
      })}
      <LoadingButton
        type="submit"
        className="w-fit"
        isLoading={loading}
        disabled={!selected}
      >
        Continue to payment
      </LoadingButton>
    </form>
  )
}
