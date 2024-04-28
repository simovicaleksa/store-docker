import LocalizedClientLink from "@/components/link/LocalizedClientLink"
import { Button } from "@/components/shared/ui/button"
import { cn } from "@/lib/utils"
import React, { type ReactNode } from "react"

type FooterLinkProps = {
  children?: ReactNode
  href: string
  className?: string
}

export default function FooterLink(props: FooterLinkProps) {
  return (
    <li>
      <Button
        variant={"link"}
        asChild
        className={cn("h-fit w-fit p-0", props.className)}
      >
        <LocalizedClientLink href={props.href}>
          {props.children}
        </LocalizedClientLink>
      </Button>
    </li>
  )
}
