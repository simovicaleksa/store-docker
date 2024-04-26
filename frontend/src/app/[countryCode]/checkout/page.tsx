import CheckoutController from "@/components/checkout/CheckoutController"
import CheckoutStep from "@/components/checkout/CheckoutStep"
import DeliveryForm from "@/components/checkout/DeliveryForm"
import DeliveryPreview from "@/components/checkout/DeliveryPreview"
import PaymentForm from "@/components/checkout/PaymentForm"
import PaymentPreview from "@/components/checkout/PaymentPreview"
import ReviewForm from "@/components/checkout/ReviewForm"
import ReviewPreview from "@/components/checkout/ReviewPreview"
import ShippingForm from "@/components/checkout/ShippingForm"
import ShippingPreview from "@/components/checkout/ShippingPreview"
import CheckoutInfo from "@/components/checkout/info/CheckoutInfo"
import { listShippingMethods } from "@/services/checkout"
import { createPaymentSessions } from "@/services/checkout/actions"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import React from "react"

export default async function CheckoutPage() {
  const cartId = cookies().get("_medusa_cart_id")?.value

  if (!cartId) {
    return null
  }

  const cart = await createPaymentSessions(cartId)

  if (!cart) {
    return null
  }

  if (cart.items.length === 0) {
    redirect("/checkout/empty")
  }

  const availableShippingMethods = await listShippingMethods(
    cart.region_id
  ).then((methods) => methods?.filter((m) => !m.is_return))

  if (!availableShippingMethods) return null

  return (
    <CheckoutController>
      <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-5 p-5 lg:flex-row">
        <div className="flex w-full flex-col gap-10">
          <CheckoutStep
            stepName="shipping"
            form={<ShippingForm cart={cart} />}
            preview={<ShippingPreview cart={cart} />}
          />
          <CheckoutStep
            stepName="delivery"
            form={
              <DeliveryForm
                cart={cart}
                availableShippingMethods={availableShippingMethods}
              />
            }
            preview={<DeliveryPreview cart={cart} />}
          />
          <CheckoutStep
            stepName="payment"
            form={<PaymentForm cart={cart} />}
            preview={<PaymentPreview cart={cart} />}
          />
          {cart.payment_session?.provider_id !== "stripe" && (
            <CheckoutStep
              stepName="review"
              form={<ReviewForm cart={cart} />}
              preview={<ReviewPreview />}
            />
          )}
        </div>
        <CheckoutInfo cart={cart} />
      </main>
    </CheckoutController>
  )
}
