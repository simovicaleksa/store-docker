"use client"

import useCurrencyCode from "@/hooks/countries/useCurrencyCode"
import { formatAmount } from "@/utils/prices"
import React from "react"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableRow,
} from "../shared/ui/table"
import { type Order } from "@medusajs/medusa"
import { Loader } from "lucide-react"

export default function OrderTotal({
  order,
}: {
  order: Order | null | undefined
}) {
  const { currencyCode } = useCurrencyCode()

  if (!order) return null

  const subtotal = formatAmount(order.subtotal, currencyCode, "")
  const shipping = formatAmount(order.shipping_total, currencyCode, "")
  const taxTotal = formatAmount(order.tax_total, currencyCode, "")
  const total = formatAmount(order.total, currencyCode, "")

  return (
    <Table>
      <TableCaption>Order summary</TableCaption>
      <TableBody>
        <TableRow className="text-muted-foreground">
          <TableCell className="text-sm">Subtotal</TableCell>
          <TableCell className="flex flex-row justify-end text-end">
            {subtotal || <Loader className="size-4 animate-spin" />}
          </TableCell>
        </TableRow>
        <TableRow className="text-muted-foreground">
          <TableCell className="text-sm">Shipping</TableCell>
          <TableCell className="flex flex-row justify-end text-end">
            {shipping || <Loader className="size-4 animate-spin" />}
          </TableCell>
        </TableRow>
        <TableRow className="text-muted-foreground">
          <TableCell className="text-sm">Taxes</TableCell>
          <TableCell className="flex flex-row justify-end text-end">
            {taxTotal || <Loader className="size-4 animate-spin" />}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-base">Total</TableCell>
          <TableCell className="flex flex-row justify-end text-end text-lg">
            {total || <Loader className="size-4 animate-spin" />}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
