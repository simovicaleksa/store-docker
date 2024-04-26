import { type Region } from "@medusajs/medusa"

export type RegionInfo = Pick<Region, "currency_code" | "tax_code" | "tax_rate">
