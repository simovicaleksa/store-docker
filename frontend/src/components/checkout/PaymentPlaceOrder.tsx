import React, { use } from "react"
import { Checkbox } from "../shared/ui/checkbox"
import { Label } from "../shared/ui/label"
import { toast } from "../shared/ui/use-toast"
import { Stripe, StripeElements } from "@stripe/stripe-js"
import useAsyncLoader from "@/hooks/shared/useAsyncLoader"
import { CardFooter } from "../shared/ui/card"
import LoadingButton from "../shared/ui/loading-button"
import { CardNumberElement } from "@stripe/react-stripe-js"
import { CartType } from "@/types/global"
import { completeCart } from "@/services/checkout"
import { placeOrder } from "@/services/checkout/actions"

type PaymentPlaceOrderProps = {
  toggleChecked: () => void
  checked: boolean
  elements: StripeElements | null
  stripe: Stripe | null
  cart: CartType
  clientSecret: string
}

export default function PaymentPlaceOrder({
  checked,
  toggleChecked,
  stripe,
  elements,
  cart,
  clientSecret,
}: PaymentPlaceOrderProps) {
  const { asyncLoader, isLoading } = useAsyncLoader()

  function onSubmit() {
    asyncLoader(async () => {
      if (!checked) {
        toast({
          title: "Agree to terms of service.",
          description:
            "You have to agree to terms of service before placing an order.",
        })
      }

      if (!stripe) {
        toast({
          title: "Unable to load Stripe.",
          description:
            "Please try to reload the page or try a different payment method.",
          variant: "destructive",
        })
        return null
      }

      if (!elements) {
        toast({
          title: "Card error.",
          description:
            "Please provide the required fields. Card number, expiry date and cvc.",
          variant: "destructive",
        })
        return null
      }

      const cardElement = elements.getElement(CardNumberElement)
      if (!cardElement) {
        toast({
          title: "Card error.",
          description:
            "Please provide the required fields. Card number, expiry date and cvc.",
          variant: "destructive",
        })
        return null
      }

      const billingName = `${cart.shipping_address?.first_name} ${cart.shipping_address?.last_name}`
      const billingAddress2 = cart?.shipping_address?.address_2

      try {
        const { error, paymentIntent } = await stripe.confirmCardPayment(
          clientSecret,
          {
            payment_method: {
              card: cardElement,
              billing_details: {
                name: billingName,
                address: {
                  city: cart.shipping_address?.city || undefined,
                  country: cart.shipping_address?.country_code || undefined,
                  line1: cart.shipping_address?.address_1 || undefined,
                  line2: billingAddress2 || undefined,
                  postal_code: cart.shipping_address?.postal_code || undefined,
                  state: cart.shipping_address?.province || undefined,
                },
                email: cart?.email || undefined,
                phone: cart.shipping_address?.phone || undefined,
              },
            },
          }
        )

        if (error) {
          toast({
            title: "Card declined.",
            description: error.message,
            variant: "destructive",
          })
          return null
        }

        await placeOrder()
      } catch (err) {
        console.log(err)
        toast({
          title: "Something went wrong with payment.",
          description: "Please try again later or contact customer support.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <CardFooter className="flex flex-col items-start space-y-5 border-t pt-5 text-start">
      <div className="flex flex-col gap-3">
        <p className="text-sm text-muted-foreground">
          By checking the box below, you confirm that you have read and agreed
          to our Terms of Service.
        </p>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="terms"
            onCheckedChange={toggleChecked}
            checked={checked}
          />
          <Label
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="terms"
          >
            I have read and agree to the Terms of Service.
          </Label>
        </div>
      </div>
      <LoadingButton
        className="self-end"
        isLoading={isLoading}
        onClick={onSubmit}
        disabled={!checked}
      >
        Place order
      </LoadingButton>
    </CardFooter>
  )
}
