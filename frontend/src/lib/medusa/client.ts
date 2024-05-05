import Medusa from "@medusajs/medusa-js"

const medusa = new Medusa({
  baseUrl: "https://codexn.net:9000",
  maxRetries: 3,
})

export default medusa
