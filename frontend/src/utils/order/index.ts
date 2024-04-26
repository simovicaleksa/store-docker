export const formatStatus = (str: string) => {
  if (!str) return ""

  const formatted = str.split("_").join(" ")

  return formatted.slice(0, 1).toUpperCase() + formatted.slice(1)
}
