import { useEffect, useState } from "react"

type ScreenType = "sm" | "md" | "lg" | "xl" | "2xl"

export default function useTailwindBreakpoint(screen: ScreenType) {
  const [isBreakpoint, setIsBreakPoint] = useState<boolean>(false)

  useEffect(() => {
    if (typeof window === "undefined") return

    function handleScreenResize() {
      const screens = {
        sm: 640,
        md: 768,
        lg: 1024,
        xl: 1280,
        "2xl": 1400,
      }

      const documentWidth = window.innerWidth
      const currentScreen = screens[screen]

      if (documentWidth >= currentScreen) {
        setIsBreakPoint(true)
      } else {
        setIsBreakPoint(false)
      }
    }

    handleScreenResize()

    window.addEventListener("resize", handleScreenResize)

    return () => {
      window.removeEventListener("resize", handleScreenResize)
    }
  }, [screen])

  return { isBreakpoint }
}
