import Overlay from "@/components/layout/Overlay"
import Footer from "@/components/layout/footer/Footer"
import Header from "@/components/layout/header/Header"
import { storeName } from "@/constants/store"
import JotaiProvider from "@/providers/jotai/JotaiProvider"
import "@/styles/globals.css"

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

export const metadata = {
  title: `${storeName} | Better Shopping`,
  description: `${storeName} is an e-commerce store of the future.`,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
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
