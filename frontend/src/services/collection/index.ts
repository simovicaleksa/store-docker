import medusa from "@/lib/medusa/client"
import { StoreGetCollectionsParams } from "@medusajs/medusa"
import { cache } from "react"

export const getCollections = cache(
  async ({ limit = 5, ...params }: StoreGetCollectionsParams) => {
    let response
    try {
      response = await medusa.collections.list({ limit, ...params })
    } catch (err: any) {
      if (typeof err?.message === "string") {
        console.log(err.message)
      } else {
        console.log("Server error.")
      }
    } finally {
      return response
    }
  }
)
