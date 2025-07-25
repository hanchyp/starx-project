"use client"

import { useState } from "react"
import { useParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useWallet } from "@/app/providers"
import { Star, Users, Clock, Music, ShoppingBag, Calendar, Award } from "lucide-react"

// Define types
interface Benefit {
  id: number
  title: string
  description: string
  requiredTokens: number
  type: "purchase" | "hold"
  holdPeriod?: string
  icon: any
  color: string
}

interface Artist {
  id: string
  name: string
  genre: string
  bio: string
  tokenPrice: number
  totalTokens: number
  soldTokens: number
  image: string
  coverImage: string
  rating: number
  totalHolders: number
  benefits: Benefit[]
  stats: {
    totalVolume: string
    avgHoldTime: string
    topHolder: string
  }
}

// Mock data - in real app, this would come from API
const artistData: Record<string, Artist> = {
  "taylor-swift": {
    id: "taylor-swift",
    name: "Taylor Swift",
    genre: "Pop",
    bio: "Taylor Swift is a global superstar known for her storytelling songwriting and genre-spanning discography. With multiple Grammy wins and record-breaking albums, she continues to redefine the music industry.",
    tokenPrice: 0.25,
    totalTokens: 10000,
    soldTokens: 7500,
    image: "/images/taylor.jpg",
    coverImage: "/images/taylor.jpg",
    rating: 4.9,
    totalHolders: 125000,
    benefits: [
      {
        id: 1,
        title: "Early Access to New Albums",
        description: "Get access to new releases 48 hours before public launch",
        requiredTokens: 10,
        type: "purchase",
        icon: Music,
        color: "bg-gray-500",
      },
      {
        id: 2,
        title: "Exclusive Merchandise Drops",
        description: "Limited edition Taylor Swift merchandise collections",
        requiredTokens: 25,
        type: "purchase",
        icon: ShoppingBag,
        color: "bg-gray-500",
      },
      {
        id: 3,
        title: "VIP Concert Tickets",
        description: "Priority access to concert tickets and VIP experiences",
        requiredTokens: 50,
        type: "purchase",
        icon: Calendar,
        color: "bg-gray-500",
      },
      {
        id: 4,
        title: "Behind-the-Scenes Content",
        description: "Exclusive studio footage and creative process insights",
        requiredTokens: 75,
        type: "purchase",
        icon: Award,
        color: "bg-gray-500",
      },
    ],
    stats: {
      totalVolume: "1,250 ETH",
      avgHoldTime: "6.2 months",
      topHolder: "2,150 tokens",
    },
  },
  "ariana-grande": {
    id: "ariana-grande",
    name: "Ariana Grande",
    genre: "Pop/R&B",
    bio: "Ariana Grande is known for her powerful vocals and impressive range. With multiple platinum albums and Grammy wins, she's one of the most influential artists of her generation.",
    tokenPrice: 0.22,
    totalTokens: 12000,
    soldTokens: 9500,
    image: "/images/ariana.webp",
    coverImage: "/images/ariana.webp",
    rating: 4.8,
    totalHolders: 110000,
    benefits: [
      {
        id: 1,
        title: "Exclusive Vocal Lessons",
        description: "Learn vocal techniques from Ariana's vocal coach",
        requiredTokens: 15,
        type: "purchase",
        icon: Music,
        color: "bg-gray-500",
      },
      {
        id: 2,
        title: "Limited Edition Perfume",
        description: "Early access to new fragrance collections",
        requiredTokens: 35,
        type: "purchase",
        icon: ShoppingBag,
        color: "bg-gray-500",
      },
      {
        id: 3,
        title: "Backstage Access",
        description: "Meet Ariana backstage at concerts",
        requiredTokens: 70,
        type: "purchase",
        icon: Calendar,
        color: "bg-gray-500",
      },
      {
        id: 4,
        title: "Collaboration Opportunities",
        description: "Chance to collaborate on special projects",
        requiredTokens: 150,
        type: "hold",
        holdPeriod: "6 months",
        icon: Award,
        color: "bg-gray-500",
      },
    ],
    stats: {
      totalVolume: "1,100 ETH",
      avgHoldTime: "5.5 months",
      topHolder: "1,950 tokens",
    },
  },
}

export default function ArtistDetailPage() {
  const params = useParams()
  const { isConnected } = useWallet()
  const [tokenAmount, setTokenAmount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  // Safe access with proper typing
  const artistId = params.id as string
  const artist = artistData[artistId]

  if (!artist) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-2">Artist not found</h2>
        <p className="text-gray-600">The artist you're looking for doesn't exist.</p>
      </div>
    )
  }

  const handleBuyTokens = async () => {
    if (!isConnected) return

    setIsLoading(true)
    // Mock transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    // Show success message
    alert(
      `Successfully purchased ${tokenAmount} ${artist.name} tokens for ${(tokenAmount * artist.tokenPrice).toFixed(3)} ETH!`,
    )
  }

  const totalCost = tokenAmount * artist.tokenPrice
  const soldPercentage = (artist.soldTokens / artist.totalTokens) * 100

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative rounded-lg overflow-hidden">
        <img
          src={artist.coverImage || "/placeholder.svg"}
          alt={`${artist.name} cover`}
          className="w-full h-64 md:h-80 object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        <div className="absolute bottom-6 left-6 text-white">
          <Badge className="mb-2">{artist.genre}</Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">{artist.name}</h1>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span>{artist.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Users className="h-5 w-5" />
              <span>{artist.totalHolders.toLocaleString()} holders</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About {artist.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">{artist.bio}</p>
            </CardContent>
          </Card>

          {/* Benefits */}
          <Card>
            <CardHeader>
              <CardTitle>Token Benefits</CardTitle>
              <CardDescription>Unlock exclusive perks by holding different amounts of tokens</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {artist.benefits.map((benefit) => {
                  const Icon = benefit.icon
                  return (
                    <div key={benefit.id} className="flex items-start space-x-4 p-4 rounded-lg border">
                      <div className={`p-2 rounded-full ${benefit.color}`}>
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{benefit.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{benefit.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <Badge variant="outline">{benefit.requiredTokens} tokens required</Badge>
                          {benefit.type === "hold" && benefit.holdPeriod && (
                            <Badge variant="outline">
                              <Clock className="mr-1 h-3 w-3" />
                              Hold for {benefit.holdPeriod}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Statistics */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold">{artist.stats.totalVolume}</div>
                  <div className="text-sm text-muted-foreground">Total Volume</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{artist.stats.avgHoldTime}</div>
                  <div className="text-sm text-muted-foreground">Avg Hold Time</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{artist.stats.topHolder}</div>
                  <div className="text-sm text-muted-foreground">Top Holder</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Artist Image */}
          <Card>
            <CardContent className="p-0">
              <img
                src={artist.image || "/placeholder.svg"}
                alt={artist.name}
                className="w-full aspect-square object-cover rounded-lg"
              />
            </CardContent>
          </Card>

          {/* Buy Tokens */}
          <Card>
            <CardHeader>
              <CardTitle>Buy Tokens</CardTitle>
              <CardDescription>Current price: {artist.tokenPrice} ETH per token</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Amount</label>
                <Input
                  type="number"
                  min="1"
                  value={tokenAmount}
                  onChange={(e) => setTokenAmount(Math.max(1, Number.parseInt(e.target.value) || 1))}
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Price per token:</span>
                  <span>{artist.tokenPrice} ETH</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Quantity:</span>
                  <span>{tokenAmount}</span>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Total:</span>
                  <span>{totalCost.toFixed(3)} ETH</span>
                </div>
              </div>

              <Button className="w-full" onClick={handleBuyTokens} disabled={!isConnected || isLoading}>
                {!isConnected ? "Connect Wallet" : isLoading ? "Processing..." : "Buy Tokens"}
              </Button>
            </CardContent>
          </Card>

          {/* Token Supply */}
          <Card>
            <CardHeader>
              <CardTitle>Token Supply</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Sold:</span>
                  <span>{artist.soldTokens.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Total:</span>
                  <span>{artist.totalTokens.toLocaleString()}</span>
                </div>
                <Progress value={soldPercentage} className="h-2" />
                <div className="text-center text-sm text-muted-foreground">{soldPercentage.toFixed(1)}% sold</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
