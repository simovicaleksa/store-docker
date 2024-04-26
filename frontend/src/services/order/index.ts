import medusa from "@/lib/medusa/client"
import medusaError from "@/utils/medusa"
import { cache } from "react"

export const retrieveOrder = cache(async function (id: string) {
  return medusa.orders
    .retrieve(id)
    .then(({ order }) => order)
    .catch((err) => medusaError(err))
})
