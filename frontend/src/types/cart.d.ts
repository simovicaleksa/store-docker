import { type Cart } from "@medusajs/medusa"

export type CartType = Omit<Cart, "refundable_amount" | "refunded_total">
