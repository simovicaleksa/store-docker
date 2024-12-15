import Overlay from "@/components/layout/Overlay"
import Footer from "@/components/layout/footer/Footer"
import Header from "@/components/layout/header/Header"
import { env } from "@/env"
import JotaiProvider from "@/providers/jotai/JotaiProvider"
import "@/styles/globals.css"
import { type Metadata } from "next"
import { PublicEnvScript } from "next-runtime-env"

import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
})

// const poppins = Poppins({
//   subsets: ["latin"],
//   variable: "--font-sans",
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
// })

// const rubik = Rubik({
//   subsets: ["latin"],
//   variable: "--font-sans",
//   weight: ["300", "400", "500", "600", "700", "800", "900"],
// })

export const metadata: Metadata = {
  title: env.NEXT_PUBLIC_COMPANY_NAME,
  description: env.NEXT_PUBLIC_COMPANY_DESCRIPTION,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <PublicEnvScript />
      </head>
      <body className={`${inter.className}`}>
        <JotaiProvider>
          <Overlay />
          <Header />
          {children}
          <Footer />
        </JotaiProvider>
      </body>
    </html>
  )
}
