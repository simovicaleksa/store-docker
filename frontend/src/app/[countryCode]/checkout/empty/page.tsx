import LocalizedClientLink from "@/components/link/LocalizedClientLink"
import { Button } from "@/components/shared/ui/button"
import { ArrowRight, XCircleIcon } from "lucide-react"
import React from "react"

export default function CheckoutEmptyPage() {
  return (
    <main className="bg-background min-h-screen w-full">
      <div className="mx-auto max-w-6xl">
        <div className="mx-auto flex flex-col items-center justify-center p-5 pt-20 text-center">
          <XCircleIcon className="text-destructive mb-5 size-24" />
          <h1 className="text-center text-3xl font-semibold lg:text-4xl">
            Checkout failed
          </h1>
          <p className="text-muted-foreground mx-auto max-w-lg text-center text-sm">
            You have tried to enter checkout with an empty cart. Please add at
            least one item to your cart before attempting checkout or contact
            customer support if you think this is an error.
          </p>

          <div className="mt-5 flex flex-row space-x-2">
            <Button asChild variant={"outline"} className="group">
              <LocalizedClientLink href="/">Back to home</LocalizedClientLink>
            </Button>
            <Button asChild variant={"default"} className="group">
              <LocalizedClientLink href="/search">
                Browse products
                <ArrowRight className="ml-2 size-4 duration-200 group-hover:translate-x-1" />
              </LocalizedClientLink>
            </Button>
          </div>
        </div>
      </div>
    </main>
  )
}
