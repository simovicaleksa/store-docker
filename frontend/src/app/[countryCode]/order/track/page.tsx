import TrackForm from "@/components/order/TrackForm"
import { FlagTriangleRight, PackageIcon, TruckIcon } from "lucide-react"
import React from "react"

export default function TrackOrder() {
  return (
    <main className="relative min-h-screen bg-gradient-to-br from-secondary to-background">
      <div className="opacity-20 *:rounded-[var(--radius)] *:p-5 *:text-muted-foreground *:shadow-md *:duration-200 md:opacity-100">
        <TruckIcon className="animate-fade-up animate-duration-1000 animate-once animate-delay-150 absolute bottom-32 right-16 size-20 -rotate-12 border md:right-32 md:size-48 md:hover:size-40 md:hover:-rotate-3 2xl:bottom-52" />
        <PackageIcon className="animate-fade-right animate-duration-1000 animate-once animate-delay-300 absolute bottom-32 left-16 size-32 rotate-6 border md:top-96 md:size-72 md:hover:size-64 md:hover:-rotate-6" />
        <FlagTriangleRight className="animate-fade-left animate-duration-1000 animate-once 3xl:block absolute right-64 top-32 hidden size-32 rotate-6 xl:hover:size-28 xl:hover:-rotate-6" />
      </div>

      <section className="animate-delay-200 animate-fade mx-auto max-w-5xl translate-y-5 p-5 lg:translate-y-20">
        <TrackForm />
      </section>
    </main>
  )
}
