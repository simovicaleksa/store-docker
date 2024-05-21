"use client"

import { useEffect, useState } from "react"

export default function useScrollY() {
  const [scrollY, setScrollY] = useState<number>(0)
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("up")
  const isScrolled = scrollY !== 0

  useEffect(() => {
    if (typeof window === "undefined") return

    function handleScroll() {
      const currentScroll = Math.floor(window.scrollY)

      currentScroll > scrollY
        ? setScrollDirection("down")
        : setScrollDirection("up")

      setScrollY(currentScroll)
    }

    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [scrollY])

  return { scrollY, isScrolled, scrollDirection }
}
