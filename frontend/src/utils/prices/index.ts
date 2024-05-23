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

  const isNoDivisionCurrency = noDivisionCurrencies.includes(currencyCode)

  currencyAmount = convertToDecimal(currencyAmount)

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    maximumFractionDigits: isNoDivisionCurrency ? 0 : 2,
  })

  return formatter.format(currencyAmount)
}
