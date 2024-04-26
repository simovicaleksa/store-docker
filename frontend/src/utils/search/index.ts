import { sortOrderMap } from "@/constants/search"

export function getQuerySearchParam(query: string | string[] | undefined) {
  return typeof query === "string" ? query : ""
}

export function getSortOrderParam(sort: string | string[] | undefined) {
  return typeof sort === "string" ? sortOrderMap[sort] || undefined : undefined
}
