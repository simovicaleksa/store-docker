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

export default function CheckoutTotal({ cart }: { cart: CartType | null }) {
  const { currencyCode } = useCurrencyCode()

  return (
    <Table className="bg-secondary rounded-sm">
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
        <TableRow className="text-foreground text-xl font-semibold">
          <TableCell className="text-start">Total</TableCell>
          <TableCell className="text-end">
            {formatAmount(cart?.total, currencyCode, "Get a quote")}
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
