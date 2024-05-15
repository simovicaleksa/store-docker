import React from "react"
import SettingsDropdown from "@/components/settings/SettingsDropdown"
import { Button } from "@/components/shared/ui/button"
import Link from "next/link"
import CartTrigger from "@/components/cart/CartTrigger"
import HeaderNavigation from "./HeaderNavigation"
import { storeName } from "@/constants/store"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background p-5 text-secondary-foreground">
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
