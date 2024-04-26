import { PaymentSession } from "@medusajs/medusa"
import React, { Dispatch, SetStateAction } from "react"
import { Button } from "../shared/ui/button"
import { paymentInfoMap } from "@/constants/payment"
import RadioRing from "../shared/ui/radio-ring"
import { Loader } from "lucide-react"
import PaymentStripeWrapper from "./PaymentStripeWrapper"
import { CartType } from "@/types/global"

type PaymentRadioButtonProps = {
  paymentSession: PaymentSession
  setSelected: Dispatch<SetStateAction<string | null>>
  selected: string | null
  cart: CartType
  isLoading: boolean
}
const cardProviders = ["stripe", "stripe-ideal", "stripe-bancontact"]

export default function PaymentRadioButton({
  selected,
  paymentSession,
  setSelected,
  cart,
  isLoading,
}: PaymentRadioButtonProps) {
  const isSelected = paymentSession.provider_id === selected
  const isCreditCard = cardProviders.includes(paymentSession.provider_id)
  const showCardForm = isCreditCard && isSelected

  function onPaymentMethodSelect() {
    setSelected(paymentSession.provider_id)
  }

  return (
    <div className="flex flex-col space-y-2">
      <Button
        className="w-full justify-start py-7"
        variant={"outline"}
        onClick={onPaymentMethodSelect}
        disabled={isLoading}
      >
        <div className="flex h-full w-full flex-row items-center justify-between">
          <div className="flex flex-row items-center space-x-2">
            <RadioRing isSelected={isSelected} />
            <span>{paymentInfoMap[paymentSession.provider_id].title}</span>
          </div>
          <span className="text-muted-foreground">
            {paymentInfoMap[paymentSession.provider_id].icon}
          </span>
        </div>
      </Button>
      {showCardForm && <PaymentStripeWrapper cart={cart} />}
    </div>
  )
}
