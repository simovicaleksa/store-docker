export function getPagesCount(count: number, limit: number) {
  return Math.ceil(count / limit)
}
