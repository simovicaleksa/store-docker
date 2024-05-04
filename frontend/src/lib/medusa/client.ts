import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa({
  baseUrl: "https://host.docker.internal:9000",
  maxRetries: 5,
})

export default medusa
