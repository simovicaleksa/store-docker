export const formatStatus = (str: string) => {
  if (!str) return ""

  const formatted = str.split("_").join(" ")

  return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
}

export const getPaymentStatus = (str: string) => {
  if (!str) return "No status available"

  return ""
}

export function getFulfillmentStatusDescription(
  fulfillment_status: string | undefined | null,
) {
  switch (fulfillment_status) {
    case "fulfilled":
      return "Your items have been successfully fulfilled and will shipped soon."
    case "shipped":
      return "Your items have been successfully shipped. You may expect them to arrive in a few days."
    case "canceled":
      return "Your order has been canceled. Contact customer support for more information."
    case "returned":
      return "You have returned your items."
    case "partially_shipped":
      return "Some of your ordered items could not be shipped. Contact customer support for more information."
    case "partially_returned":
      return "You have returned some of your ordered items."
    default:
      return "Your items are awaiting fulfillment. This process can take up to a day."
  }
}
