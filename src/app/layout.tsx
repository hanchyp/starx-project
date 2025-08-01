import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";
import { Navbar } from "@/components/navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "STARX - Decentralized Fandom Platform",
  description:
    "Invest in artist tokens and unlock exclusive experiences with your favorite musicians",
    // icons: {
    //   icon: '/favicon.png'
    // }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdwebProvider>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-6 py-8">{children}</main>
          </div>
        </ThirdwebProvider>
      </body>
    </html>
  );
}
