import Medusa from "@medusajs/medusa-js"
import { BACKEND_URL } from "@/constants/shared/index"

const medusa = new Medusa({
  baseUrl: "http://backend:9000",
  maxRetries: 3,
})

export default medusa
