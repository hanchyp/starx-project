"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useWallet } from "./providers"
import { TrendingUp, Users, Gift, Music, Sparkles } from "lucide-react"
import { ArtistCoinCarousel } from "@/components/artist-coin-carousel"

export default function HomePage() {
  const { isConnected } = useWallet()

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col text-center space-y-6 py-16 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
          <div
            className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
          <div
            className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"
            style={{ animationDelay: "4s" }}
          ></div>
        </div>

        <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
          Own Your Music
          <br />
          <span className="text-4xl md:text-6xl">Experience</span>
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Invest in artist tokens, unlock exclusive benefits, and get closer to your favorite musicians than ever
          before. Join the future of music ownership and fan engagement.
        </p>
        {!isConnected && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-8">
            <Button
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 text-lg cursor-pointer"
            >
              Get Started Now
            </Button>
            <Button variant="outline" size="lg" className="px-8 py-3 text-lg border-2 bg-transparent cursor-pointer">
              Learn More
            </Button>
          </div>
        )}
      </section>

      {/* Artist Coin Carousel */}
      <section className="py-8">
        <ArtistCoinCarousel />
      </section>
    </div>
  )
}
