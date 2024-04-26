const convertToDecimal = (amount: number) => {
  return Math.floor(amount) / 100
}

export function formatAmount(
  amount: number | null | undefined,
  currencyCode: string | null | undefined,
  fallback: string = "Get a quote"
) {
  if (typeof amount !== "number" || !currencyCode) return fallback

  const decimalAmount = convertToDecimal(amount)

  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
  })

  return formatter.format(decimalAmount)
}
