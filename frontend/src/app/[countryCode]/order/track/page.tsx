import TrackForm from "@/components/order/TrackForm"
import { FlagTriangleRight, PackageIcon, TruckIcon } from "lucide-react"
import React from "react"

export default function TrackOrder() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-secondary to-background">
      <div className="opacity-20 *:rounded-[var(--radius)] *:p-5 *:text-muted-foreground *:shadow-md *:duration-200 md:opacity-100">
        <TruckIcon className="absolute bottom-32 right-16 size-20 -rotate-12 border md:right-32 md:size-48  2xl:bottom-52" />
        <PackageIcon className="absolute bottom-32 left-16 size-32 rotate-6 border md:top-96 md:size-72" />
        <FlagTriangleRight className="absolute right-64 top-32 hidden size-32 rotate-6  3xl:block" />
      </div>

      <section className="mx-auto max-w-5xl translate-y-5 p-5 lg:translate-y-20">
        <TrackForm />
      </section>
    </main>
  )
}
