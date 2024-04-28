import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa({
  baseUrl: "http://host.internal.docker:9000",
  maxRetries: 5,
})

export default medusa
