"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Star, TrendingUp } from "lucide-react"

const artists = [
  {
    id: "1",
    name: "Luna Eclipse",
    genre: "Electronic",
    tokenPrice: 0.1,
    totalTokens: 10000,
    soldTokens: 7500,
    image: "/placeholder.svg?height=200&width=200&text=Luna",
    rating: 4.8,
    growth: "+15%",
    benefits: ["Early Access", "Exclusive Merch", "VIP Concert"],
  },
  {
    id: "2",
    name: "Neon Waves",
    genre: "Synthwave",
    tokenPrice: 0.08,
    totalTokens: 15000,
    soldTokens: 12000,
    image: "/placeholder.svg?height=200&width=200&text=Neon",
    rating: 4.6,
    growth: "+8%",
    benefits: ["Demo Tracks", "Meet & Greet", "Limited Edition Vinyl"],
  },
]

export default function ArtistsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Discover Artists
        </h1>
        <p className="text-gray-600">
          Browse and invest in your favorite artists' tokens to unlock exclusive benefits.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {artists.map((artist) => (
          <Card
            key={artist.id}
            className="overflow-hidden hover:shadow-lg transition-shadow bg-white/80 backdrop-blur-sm"
          >
            <div className="aspect-square relative">
              <img src={artist.image || "/placeholder.svg"} alt={artist.name} className="w-full h-full object-cover" />
              <Badge className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">
                {artist.genre}
              </Badge>
              <div className="absolute top-4 left-4 flex items-center space-x-1 bg-black/50 rounded-full px-2 py-1">
                <TrendingUp className="h-3 w-3 text-green-400" />
                <span className="text-xs text-white">{artist.growth}</span>
              </div>
            </div>

            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                {artist.name}
                <div className="flex items-center space-x-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{artist.rating}</span>
                </div>
              </CardTitle>
              <CardDescription>
                {artist.soldTokens.toLocaleString()} / {artist.totalTokens.toLocaleString()} tokens sold
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Token Price</span>
                <span className="font-bold text-blue-600">{artist.tokenPrice} ETH</span>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
                asChild
              >
                <Link href={`/artists/${artist.id}`}>View Details & Buy Tokens</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
