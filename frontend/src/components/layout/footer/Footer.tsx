import React from "react"
import FooterCopyright from "./FooterCopyright"
import { type LinkType } from "../header/HeaderNavigation"
import FooterLink from "./FooterLink"
import { getCollections } from "@/services/collection"
import FooterCollections from "./FooterCollections"
import FooterRegion from "./FooterRegion"
import { bubblesPattern } from "@/constants/patterns"
import { env } from "@/env"

const usefulLinks: LinkType[] = [
  {
    title: "Collections",
    href: "/collections",
  },
  {
    title: "Search",
    href: "/search",
  },
  {
    title: "Track Order",
    href: "/order/track",
  },
  {
    title: "Contact",
    href: "/contact",
  },
  {
    title: "About",
    href: "/about",
  },
]

export default async function Footer() {
  const response = await getCollections({ limit: 5 })

  return (
    <footer
      className="relative w-full border-t bg-gradient-to-tl from-muted-foreground/20 to-background pb-32 pt-10"
      style={{ backgroundImage: bubblesPattern }}
    >
      <FooterCopyright />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 p-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="w-full space-y-3">
          <h1 className="text-xl font-semibold">
            {env.NEXT_PUBLIC_COMPANY_NAME}
          </h1>
          <p className="text-sm text-muted-foreground">
            {env.NEXT_PUBLIC_COMPANY_DESCRIPTION}
          </p>
        </div>
        <div className="w-full space-y-3">
          <h1 className="text-xl font-semibold">Navigation</h1>
          <ul className="space-y-1">
            {usefulLinks.map((link) => (
              <FooterLink key={link.href} href={link.href}>
                {link.title}
              </FooterLink>
            ))}
          </ul>
        </div>
        <FooterCollections collections={response?.collections} />
        <FooterRegion />
      </div>
    </footer>
  )
}
