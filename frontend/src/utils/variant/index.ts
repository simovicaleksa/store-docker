import { ProductOptionValue } from "@medusajs/medusa"
import {
  PricedProduct,
  PricedVariant,
} from "@medusajs/medusa/dist/types/pricing"
import { formatAmount } from "../prices"

export function getProductVariantByOptions(
  options: ProductOptionValue[],
  product: PricedProduct
) {
  return product.variants.find((variant) =>
    variant.options?.every((everyOption) =>
      options.some(
        (someSelectedOption) =>
          everyOption.option_id === someSelectedOption.option_id &&
          everyOption.value === someSelectedOption.value
      )
    )
  )
}

export function getVariantPriceAmount(
  variant: PricedVariant,
  currencyCode: string
) {
  return variant.prices.find((price) => price.currency_code === currencyCode)
    ?.amount
}

export function getVariantPrice(variant: PricedVariant, currencyCode: string) {
  return formatAmount(
    getVariantPriceAmount(variant, currencyCode),
    currencyCode
  )
}
