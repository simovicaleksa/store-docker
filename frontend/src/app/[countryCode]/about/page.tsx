import AboutSection from "@/components/about/AboutSection"
import LocalizedClientLink from "@/components/link/LocalizedClientLink"
import { Button } from "@/components/shared/ui/button"
import { ArrowRight } from "lucide-react"
import { type Metadata } from "next"
import React from "react"

export const metadata: Metadata = {
  title: "About",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <div className="mx-auto max-w-xl space-y-7 px-5 py-10">
        <AboutSection title="Who we are?">
          CodeXn is a web development service established in early 2023. We make
          top-notch e-commerce websites, like this one, for businesses around
          the world.
        </AboutSection>
        <AboutSection title="Pricing">
          Our online store solution costs $1000 one-time payment and 15 minutes
          of your time. The only other thing you need to pay for is hosting
          which starts at $4 a month, depending on your expected traffic.
        </AboutSection>
        <AboutSection title="Features">
          You can expect all features modern e-commerce stores have, such as:
          digital cart, order tracking, clean checkout and more... If you wish
          any custom features, we can arrange them for a price.
        </AboutSection>
        <AboutSection title="Mission">
          Our mission is to help small and medium size businesses get started
          selling things online at an affordable price.
        </AboutSection>
        <AboutSection title="Architecture">
          If you are wondering {"what's"} under the hood, entire website is
          coded from scratch using React.js, and deployed on a VPS. This is the
          main reason why hosting cost is so cheap.
        </AboutSection>
        <div className="flex flex-row gap-2">
          <Button asChild>
            <LocalizedClientLink href="/search">
              View Products
            </LocalizedClientLink>
          </Button>
          <Button className="group" variant={"link"} asChild>
            <LocalizedClientLink href="/">
              Back to Home
              <ArrowRight className="ml-2 size-4 duration-100 group-hover:translate-x-1" />
            </LocalizedClientLink>
          </Button>
        </div>
      </div>
    </main>
  )
}
