import { Button } from "@/components/shared/ui/button"
import LoadingButton from "@/components/shared/ui/loading-button"
import { toast } from "@/components/shared/ui/use-toast"
import { ProductOptionsContext } from "@/context/product/ProductOptionsContext"
import { ProductVariantContext } from "@/context/product/ProductVariantContext"
import useCartSheet from "@/hooks/cart/useCartSheet"
import useCountry from "@/hooks/countries/useCountry"
import useAsyncLoader from "@/hooks/shared/useAsyncLoader"
import { addToCart } from "@/services/cart/actions"
import React, { use } from "react"

type ProductAddToCartProps = {
  optionsCount: number
}

export default function ProductAddToCart({
  optionsCount,
}: ProductAddToCartProps) {
  const { options } = use(ProductOptionsContext)
  const { variant } = use(ProductVariantContext)
  const { countryCode } = useCountry()
  const { setOpen } = useCartSheet()
  const { isLoading, asyncLoader } = useAsyncLoader()

  const optionsSelected = options.length === optionsCount
  const isStockOut = optionsSelected && !variant

  function handleAddToCart() {
    asyncLoader(async () => {
      if (!variant?.id) return null

      const error = await addToCart({
        quantity: 1,
        countryCode: countryCode,
        variantId: variant.id,
      })

      if (error) {
        console.error(error)
        toast({
          title: "Add to cart failed.",
          description: "Contact customer support or try again later.",
          variant: "destructive",
        })
        return null
      }

      setOpen(true)
    }).catch((e) => console.log(e))
  }

  if (!optionsSelected)
    return (
      <Button className="w-full" disabled>
        Select options
      </Button>
    )

  if (isStockOut)
    return (
      <Button className="w-full" disabled>
        Out of stock
      </Button>
    )

  return (
    <LoadingButton
      isLoading={isLoading}
      className="w-full"
      onClick={handleAddToCart}
    >
      Add to cart
    </LoadingButton>
  )
}
