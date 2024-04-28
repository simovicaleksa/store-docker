"use client"

import { useCallback, useState } from "react"

type AsyncFunctionType<T> = (...args: unknown[]) => Promise<T>

export default function useAsyncLoader<T>() {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const asyncLoader = useCallback(async (fn: AsyncFunctionType<T>) => {
    try {
      setIsLoading(true)
      await fn()
    } finally {
      setIsLoading(false)
    }
  }, [])

  return { isLoading, asyncLoader }
}
