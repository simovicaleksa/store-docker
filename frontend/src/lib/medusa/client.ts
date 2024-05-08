import { BACKEND_URL } from "@/constants/shared"
import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa({
  baseUrl: BACKEND_URL,
  maxRetries: 3,
})

export default medusa
