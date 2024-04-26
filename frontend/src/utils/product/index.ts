import { PricedProduct } from "@medusajs/medusa/dist/types/pricing"
import { formatAmount } from "../prices"

export function getCheapestProductAmount(
  product: PricedProduct,
  currencyCode: string
): number | undefined {
  let cheapestPrice: number | undefined

  product.variants.forEach((variant) => {
    variant.prices.forEach((price) => {
      if (price.currency_code === currencyCode) {
        if (cheapestPrice === undefined || price.amount < cheapestPrice) {
          cheapestPrice = price.amount
        }
      }
    })
  })

  return cheapestPrice
}

export function getCheapestProductPrice(
  product: PricedProduct,
  currencyCode: string
) {
  const amount = getCheapestProductAmount(product, currencyCode)

  return formatAmount(amount, currencyCode)
}
