import { noDivisionCurrencies } from "@/constants/countries"

const convertToDecimal = (amount: number) => {
  return Math.floor(amount) / 100
}

export function formatAmount(
  amount: number | null | undefined,
  currencyCode: string | null | undefined,
  fallback = "Get a quote",
) {
  let currencyAmount = amount

  if (typeof currencyAmount !== "number" || !currencyCode) return fallback

  if (!noDivisionCurrencies.includes(currencyCode))
    currencyAmount = convertToDecimal(currencyAmount)

  currencyAmount = Math.floor(currencyAmount)

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  })

  return formatter.format(currencyAmount)
}
