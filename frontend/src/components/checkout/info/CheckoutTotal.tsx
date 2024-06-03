"use client"

import React from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/shared/ui/table"
import useCurrencyCode from "@/hooks/countries/useCurrencyCode"
import { formatAmount } from "@/utils/prices"
import { type CartType } from "@/types/cart"
import { cn } from "@/lib/utils"

export default function CheckoutTotal({
  cart,
  className,
}: {
  cart: CartType | null
  className?: string
}) {
  const { currencyCode } = useCurrencyCode()

  return (
    <Table className={cn("rounded-sm bg-secondary", className)}>
      <TableBody>
        <TableRow>
          <TableCell className="text-start">Subtotal</TableCell>
          <TableCell className="text-end">
            {formatAmount(cart?.subtotal, currencyCode, "Error calculating")}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-start">Shipping</TableCell>
          <TableCell className="text-end">
            {formatAmount(cart?.shipping_total, currencyCode, "Free")}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-start">Taxes</TableCell>
          <TableCell className="text-end">
            {formatAmount(cart?.tax_total, currencyCode, "No taxes")}
          </TableCell>
        </TableRow>
        <TableRow className="text-xl font-semibold text-foreground">
          <TableCell className="text-start">Total</TableCell>
          <TableCell className="text-end">
            {formatAmount(cart?.total, currencyCode, "Get a quote")}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
