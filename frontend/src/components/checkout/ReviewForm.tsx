"use client"

import { CartType } from "@/types/global"
import React, { useState } from "react"
import { Checkbox } from "../shared/ui/checkbox"
import { Label } from "../shared/ui/label"
import useAsyncLoader from "@/hooks/shared/useAsyncLoader"
import { toast } from "../shared/ui/use-toast"
import { placeOrder } from "@/services/checkout/actions"
import LoadingButton from "../shared/ui/loading-button"

export default function ReviewForm({ cart }: { cart: CartType | null }) {
  const [checked, setChecked] = useState<boolean>(false)
  const { isLoading, asyncLoader } = useAsyncLoader()

  function toggleChecked() {
    setChecked((prev) => !prev)
  }

  function onSubmit() {
    if (!checked) {
      toast({
        title: "Order placement failed.",
        description:
          "You have to agree to our terms of service in order to place an order.",
      })
      return null
    }

    asyncLoader(async () => {
      try {
        await placeOrder()
      } catch (err: any) {
        toast({
          title: err?.message || "Something went wrong.",
          description: "Contact customer support for more information.",
          variant: "destructive",
        })
      }
    })
  }

  return (
    <div className="flex flex-col gap-3">
      <p className="text-sm text-muted-foreground">
        By checking the box below, you confirm that you have read and agreed to
        our Terms of Service.
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
      <LoadingButton
        isLoading={isLoading}
        onClick={onSubmit}
        className="w-fit"
        disabled={!checked}
      >
        Place order
      </LoadingButton>
    </div>
  )
}
