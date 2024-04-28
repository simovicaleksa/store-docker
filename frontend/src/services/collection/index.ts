import medusa from "@/lib/medusa/client"
import { type StoreGetCollectionsParams } from "@medusajs/medusa"
import { cache } from "react"

export const getCollections = cache(
  async ({ limit = 5, ...params }: StoreGetCollectionsParams) => {
    let response
    try {
      response = await medusa.collections.list({ limit, ...params })
    } catch (e) {
      console.log(e)
    } finally {
      return response
    }
  },
)
