import React, { type HTMLAttributes } from "react"

interface AboutSection extends HTMLAttributes<HTMLDivElement> {
  title: string
}

export default function AboutSection({
  title,
  children,
  ...rest
}: AboutSection) {
  return (
    <div className="space-y-2" {...rest}>
      <h1 className="text-2xl font-bold md:text-3xl">{title}</h1>
      <p className="text-sm md:text-base">{children}</p>
    </div>
  )
}
