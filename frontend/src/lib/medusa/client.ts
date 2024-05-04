import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa({
  baseUrl: "https://srv520376.hstgr.cloud:9000",
  maxRetries: 5,
})

export default medusa
