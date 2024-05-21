"use client"

import LocalizedClientLink from "@/components/link/LocalizedClientLink"
import { Button } from "@/components/shared/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/shared/ui/sheet"
import useTailwindBreakpoint from "@/hooks/shared/useTailwindBreakpoint"
import { ArrowRight, MenuIcon } from "lucide-react"
import React from "react"

export type LinkType = {
  href: string
  title: string
}

const navigation: LinkType[] = [
  {
    title: "Search",
    href: "/search",
  },
  {
    title: "Collections",
    href: "/collections",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "Track Order",
    href: "/order/track",
  },
]

export default function HeaderNavigation() {
  const { isBreakpoint } = useTailwindBreakpoint("md")

  return (
    <div>
      {isBreakpoint ? (
        <DesktopNavigation navigation={navigation} />
      ) : (
        <MobileNavigation navigation={navigation} />
      )}
    </div>
  )
}

function MobileNavigation(props: { navigation: LinkType[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} size={"icon"}>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent className="">
        <SheetHeader className="space-y-0 text-start">
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Where would you like to go?</SheetDescription>
        </SheetHeader>
        <nav className="mt-6">
          <ul className="flex flex-col">
            {props.navigation.map((link) => (
              <li key={link.href}>
                <SheetClose asChild>
                  <Button
                    asChild
                    variant={"link"}
                    className="px-0 text-foreground"
                  >
                    <LocalizedClientLink href={link.href}>
                      {link.title} <ArrowRight className="ml-2 size-4" />
                    </LocalizedClientLink>
                  </Button>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

function DesktopNavigation(props: { navigation: LinkType[] }) {
  return (
    <nav>
      <ul className="flex flex-row">
        {props.navigation.map((link) => (
          <li key={link.href}>
            <Button asChild variant={"link"} className="text-foreground">
              <LocalizedClientLink href={link.href}>
                {link.title}
              </LocalizedClientLink>
            </Button>
          </li>
        ))}
      </ul>
    </nav>
  )
}
