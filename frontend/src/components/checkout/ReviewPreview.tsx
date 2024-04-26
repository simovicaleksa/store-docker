import React from "react"
import { Separator } from "../shared/ui/separator"

export default function ReviewPreview() {
  return (
    <div className="grid grid-cols-2">
      <div>
        <h1 className="font-medium">Review</h1>
        <ul className="text-sm text-muted-foreground">
          <li>Order not reviewed yet.</li>
        </ul>
      </div>
      <Separator className="col-span-full my-10" />
    </div>
  )
}
