"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import React from "react"

export default function LocalizedClientLink({
  children,
  href,
  noEvents,
  ...props
}: {
  children?: React.ReactNode
  href: string
  className?: string
  onClick?: () => void
  passHref?: true
  noEvents?: boolean
}) {
  const { countryCode } = useParams()

  return (
    <Link
      href={`/${String(countryCode)}${href}`}
      style={{ pointerEvents: noEvents ? "none" : "all" }}
      {...props}
    >
      {children}
    </Link>
  )
}
