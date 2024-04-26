import ProductThumbnail from "@/components/product/ProductThumbnail"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/shared/ui/alert-dialog"
import { Button } from "@/components/shared/ui/button"
import { LineItem } from "@medusajs/medusa"
import React, { Dispatch, SetStateAction } from "react"
import useAsyncLoader from "@/hooks/shared/useAsyncLoader"
import LoadingButton from "@/components/shared/ui/loading-button"
import { updateLineItem } from "@/services/cart/actions"
import { toast } from "@/components/shared/ui/use-toast"
import useCart from "@/hooks/cart/useCart"

type ItemRemoveDialogProps = {
  lineItem: LineItem
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
}

export default function ItemRemoveDialog({
  lineItem,
  open,
  setOpen,
}: ItemRemoveDialogProps) {
  const { isLoading, asyncLoader } = useAsyncLoader()
  const { update } = useCart()

  function handleRemoveItem() {
    asyncLoader(async () => {
      const error = await updateLineItem({ lineId: lineItem.id, quantity: 0 })

      if (error) {
        console.error(error)
        toast({
          title: "Failed to remove item from cart.",
          description:
            "Failed to remove item from cart. Contact customer support if the issue persists.",
          variant: "destructive",
        })
        setOpen(false)
        return null
      }

      update()
    })
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant={"link"} className="mx-auto h-fit py-0 text-red-600">
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remove item from cart.</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure you want to remove the following item from cart?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className="my-5 flex flex-row gap-2">
          <ProductThumbnail
            src={lineItem.thumbnail}
            width={120}
            height={120}
            className="rounded-[var(--radius)] border bg-secondary p-2"
          />
          <div className="">
            <div className="flex w-full flex-col">
              <h2 className="text-lg font-bold">{lineItem.title}</h2>
              <span className="text-sm text-muted-foreground">
                {lineItem.variant.title}
              </span>
            </div>
          </div>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <LoadingButton isLoading={isLoading} onClick={handleRemoveItem}>
            Remove
          </LoadingButton>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
