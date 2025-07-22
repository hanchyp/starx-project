import type React from "react"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers"
import { Navbar } from "@/components/navbar"

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "STARX",
  description: "Buy artist tokens and unlock exclusive benefits",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="min-h-screen">
            <Navbar />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
