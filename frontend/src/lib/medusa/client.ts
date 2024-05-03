import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa({
  baseUrl: "http://host.docker.internal/api",
  maxRetries: 5,
})

export default medusa
