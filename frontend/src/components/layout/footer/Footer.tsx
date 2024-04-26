import React from "react"
import FooterCopyright from "./FooterCopyright"
import { LinkType } from "../header/HeaderNavigation"
import FooterLink from "./FooterLink"
import { getCollections } from "@/services/collection"
import FooterCollections from "./FooterCollections"
import FooterRegion from "./FooterRegion"

const usefulLinks: LinkType[] = [
  {
    title: "Products",
    href: "/products",
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
    title: "Search",
    href: "/search",
  },
]

export default async function Footer() {
  const response = await getCollections({ limit: 5 })

  return (
    <footer className="relative mt-20 w-full border-t pb-32 pt-10">
      <FooterCopyright />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 p-5 sm:grid-cols-2 xl:grid-cols-4">
        <div className="w-full space-y-3">
          <h1 className="text-xl font-semibold">Zen Store</h1>
          <p className="text-sm text-muted-foreground">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua.
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
