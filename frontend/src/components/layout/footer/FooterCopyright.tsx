import { env } from "@/env"
import React from "react"

export default function FooterCopyright() {
  return (
    <p className="absolute bottom-5 left-0 right-0 mx-auto w-fit text-xs text-muted-foreground">
      {`${env.NEXT_PUBLIC_COMPANY_NAME}© ${new Date().getFullYear()} - All rights reserved.`}
    </p>
  )
}
