import { type CartType } from "@/types/cart"
import React from "react"
import { formatAmount } from "@/utils/prices"
import useCurrencyCode from "@/hooks/countries/useCurrencyCode"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../shared/ui/table"

export default function CartSummary({ cart }: { cart: CartType | null }) {
  const { currencyCode } = useCurrencyCode()

  if (typeof cart?.total !== "number") return null

  return (
    <Table className="mt-10 divide-y rounded-[var(--radius)] border">
      <TableHeader>
        <TableRow>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell>Total</TableCell>
          <TableCell>{formatAmount(cart.total, currencyCode)}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell>Shipping</TableCell>
          <TableCell>Calculated at checkout</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
