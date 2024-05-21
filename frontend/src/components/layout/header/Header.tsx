"use client"

import React from "react"
import SettingsDropdown from "@/components/settings/SettingsDropdown"
import { Button } from "@/components/shared/ui/button"
import Link from "next/link"
import CartTrigger from "@/components/cart/CartTrigger"
import HeaderNavigation from "./HeaderNavigation"
import { storeName } from "@/constants/store"
import useScrollY from "@/hooks/shared/useScrollY"
import { cn } from "@/lib/utils"

export default function Header() {
  const { scrollY, scrollDirection } = useScrollY()

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background p-5 text-secondary-foreground duration-200",
        {
          "py-2": scrollY !== 0,
          "-translate-y-20": scrollDirection === "down" && scrollY > 500,
        },
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between">
        <Button className="text-lg font-semibold" variant={"ghost"} asChild>
          <Link href="/">{storeName}</Link>
        </Button>
        <div className="flex flex-row items-center space-x-3">
          <HeaderNavigation />
          <SettingsDropdown />
          <CartTrigger />
        </div>
      </div>
    </header>
  )
}
