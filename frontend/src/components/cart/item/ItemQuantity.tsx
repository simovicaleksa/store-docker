import { Button } from "@/components/shared/ui/button"
import { toast } from "@/components/shared/ui/use-toast"
import { LineItemContext } from "@/context/lineItem/LineItemContext"
import useCart from "@/hooks/cart/useCart"
import { updateLineItem } from "@/services/cart/actions"
import { Loader } from "lucide-react"
import React, { use, useState } from "react"
import ItemRemoveDialog from "./ItemRemoveDialog"

export default function ItemQuantity() {
  const lineItem = use(LineItemContext)
  const { update, isLoading } = useCart()

  const [open, setOpen] = useState<boolean>(false)

  async function handleDecreaseQuantity() {
    // if removing item by decreasing quantity show remove dialog
    if (lineItem.quantity - 1 === 0) {
      setOpen(true)
      return null
    }

    const error = await updateLineItem({
      lineId: lineItem.id,
      quantity: lineItem.quantity - 1,
    })
    if (error) {
      console.error(error)
      toast({
        title: "Failed to change quantity.",
        description: "Contact customer support or try again later.",
        variant: "destructive",
      })
      return null
    }

    await update()
  }

  async function handleIncreaseQuantity() {
    const error = await updateLineItem({
      lineId: lineItem.id,
      quantity: lineItem.quantity + 1,
    })
    if (error) {
      console.error(error)
      toast({
        title: "Failed to change quantity.",
        description: "Contact customer support or try again later.",
        variant: "destructive",
      })
      return null
    }

    await update()
  }

  return (
    <>
      <div className="mx-auto flex w-fit flex-row items-center justify-center whitespace-nowrap">
        <Button
          variant={"link"}
          size={"icon"}
          className="h-fit w-fit p-2 px-3"
          onClick={handleDecreaseQuantity}
          disabled={isLoading}
        >
          -
        </Button>
        <span className="text-sm text-muted-foreground">
          {isLoading ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            `QTY: ${lineItem.quantity}`
          )}
        </span>
        <Button
          variant={"link"}
          size={"icon"}
          className="h-fit w-fit p-2 px-3"
          onClick={handleIncreaseQuantity}
          disabled={isLoading}
        >
          +
        </Button>
      </div>
      <ItemRemoveDialog lineItem={lineItem} open={open} setOpen={setOpen} />
    </>
  )
}
