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

// Mock data - in real app, this would come from API
const artistData = {
  "1": {
    id: "1",
    name: "Luna Eclipse",
    genre: "Electronic",
    bio: "Luna Eclipse is a pioneering electronic music artist known for her ethereal soundscapes and innovative use of synthesizers. With over 5 years in the industry, she has performed at major festivals worldwide.",
    tokenPrice: 0.1,
    totalTokens: 10000,
    soldTokens: 7500,
    image: "/placeholder.svg?height=400&width=400",
    coverImage: "/placeholder.svg?height=300&width=800",
    rating: 4.8,
    totalHolders: 2341,
    benefits: [
      {
        id: 1,
        title: "Early Access Tier",
        description: "Get early access to new releases 48 hours before public",
        requiredTokens: 10,
        type: "purchase",
        icon: Music,
        color: "bg-blue-500",
      },
      {
        id: 2,
        title: "Exclusive Merch",
        description: "Free limited edition merchandise drops",
        requiredTokens: 25,
        type: "purchase",
        icon: ShoppingBag,
        color: "bg-purple-500",
      },
      {
        id: 3,
        title: "VIP Concert Access",
        description: "Priority booking for concerts and meet & greet",
        requiredTokens: 50,
        type: "purchase",
        icon: Calendar,
        color: "bg-green-500",
      },
      {
        id: 4,
        title: "Diamond Holder",
        description: "Exclusive studio sessions and personalized content",
        requiredTokens: 100,
        type: "hold",
        holdPeriod: "6 months",
        icon: Award,
        color: "bg-yellow-500",
      },
    ],
    stats: {
      totalVolume: "750 ETH",
      avgHoldTime: "4.2 months",
      topHolder: "1,250 tokens",
    },
  },
}

export default function ArtistDetailPage() {
  const params = useParams()
  const { isConnected } = useWallet()
  const [tokenAmount, setTokenAmount] = useState(1)
  const [isLoading, setIsLoading] = useState(false)

  const artist = artistData[params.id as string]

  if (!artist) {
    return <div>Artist not found</div>
  }

  const handleBuyTokens = async () => {
    if (!isConnected) return

    setIsLoading(true)
    // Mock transaction
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsLoading(false)

    // Show success message
    alert(`Successfully purchased ${tokenAmount} tokens for ${(tokenAmount * artist.tokenPrice).toFixed(3)} ETH!`)
  }

  const totalCost = tokenAmount * artist.tokenPrice
  const soldPercentage = (artist.soldTokens / artist.totalTokens) * 100

  return (
    <div className="space-y-8">
      <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Artist Details
      </h1>

      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle>Artist Information</CardTitle>
          <CardDescription>Detailed information about this artist</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-4">Artist details will be displayed here.</p>
          <Button
            className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600"
            disabled={!isConnected}
          >
            {!isConnected ? "Connect Wallet" : "Buy Tokens"}
          </Button>
        </CardContent>
      </Card>

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
