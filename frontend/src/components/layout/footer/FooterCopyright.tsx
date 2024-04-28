import React from "react"

export default function FooterCopyright() {
  return (
    <p className="text-muted-foreground absolute bottom-5 left-0 right-0 mx-auto w-fit text-xs">
      {`Zen Store© ${new Date().getFullYear()} - All rights reserved.`}
    </p>
  )
}
