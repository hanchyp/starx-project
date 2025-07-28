"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@/app/providers"
import {
  Gift,
  Clock,
  CheckCircle,
  Music,
  ShoppingBag,
  Calendar,
  Award,
  Download,
  ExternalLink,
  Sparkles,
} from "lucide-react"

const mockUserBenefits = [
  {
    id: 1,
    artist: "Taylor Swift",
    artistImage: "/placeholder.svg?height=40&width=40",
    title: "Early Access: Midnight Pulse",
    description: "New single available 48 hours before public release",
    type: "music",
    status: "available",
    expiresAt: "2024-01-15",
    claimedAt: null,
    tokenRequirement: 10,
    icon: Music,
    rarity: "common",
  },
  {
    id: 2,
    artist: "Taylor Swift",
    artistImage: "/placeholder.svg?height=40&width=40",
    title: "Limited Edition Holographic T-Shirt",
    description: "Exclusive merchandise drop for token holders",
    type: "merch",
    status: "claimed",
    expiresAt: "2024-01-20",
    claimedAt: "2024-01-10",
    tokenRequirement: 25,
    icon: ShoppingBag,
    rarity: "rare",
  },
  {
    id: 3,
    artist: "The Weeknd",
    artistImage: "/placeholder.svg?height=40&width=40",
    title: "VIP Concert Access",
    description: "Priority booking for upcoming tour dates",
    type: "event",
    status: "available",
    expiresAt: "2024-02-01",
    claimedAt: null,
    tokenRequirement: 50,
    icon: Calendar,
    rarity: "epic",
  },
  {
    id: 4,
    artist: "Billie Eilish",
    artistImage: "/placeholder.svg?height=40&width=40",
    title: "Studio Session Recording",
    description: "Exclusive behind-the-scenes studio content",
    type: "content",
    status: "expired",
    expiresAt: "2024-01-05",
    claimedAt: null,
    tokenRequirement: 100,
    icon: Award,
    rarity: "legendary",
  },
]

const benefitHistory = [
  {
    id: 1,
    artist: "Taylor Swift",
    artistImage: "/placeholder.svg?height=40&width=40",
    title: 'Demo Track: "Neon Dreams"',
    claimedAt: "2023-12-15",
    type: "music",
    value: "2.5 ETH",
  },
  {
    id: 2,
    artist: "The Weeknd",
    artistImage: "/placeholder.svg?height=40&width=40",
    title: "Signed Vinyl Record",
    claimedAt: "2023-12-10",
    type: "merch",
    value: "1.8 ETH",
  },
  {
    id: 3,
    artist: "Billie Eilish",
    artistImage: "/placeholder.svg?height=40&width=40",
    title: "Virtual Meet & Greet",
    claimedAt: "2023-12-05",
    type: "event",
    value: "3.2 ETH",
  },
]

export default function BenefitsPage() {
  const { isConnected } = useWallet()
  const [activeTab, setActiveTab] = useState("available")

  const handleClaimBenefit = async (benefitId: number) => {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Benefit claimed successfully!")
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "common":
        return "bg-gray-100 text-gray-700 border-gray-200"
      case "rare":
        return "bg-blue-100 text-blue-700 border-blue-200"
      case "epic":
        return "bg-purple-100 text-purple-700 border-purple-200"
      case "legendary":
        return "bg-yellow-100 text-yellow-700 border-yellow-200"
      default:
        return "bg-gray-100 text-gray-700 border-gray-200"
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500"
      case "claimed":
        return "bg-blue-500"
      case "expired":
        return "bg-gray-500"
      default:
        return "bg-gray-500"
    }
  }

  if (!isConnected) {
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 p-12 max-w-md mx-auto">
          <Gift className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h2 className="text-2xl font-semibold mb-3">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">Connect your wallet to view and claim your exclusive benefits.</p>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6">Connect Wallet</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-6 py-12 bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl border border-gray-100">
        <div className="space-y-4">
          <div className="p-4 bg-white rounded-2xl shadow-sm border border-gray-100">
            <Sparkles className="h-8 w-8 text-gray-700" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900">My Benefits</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage and claim your exclusive benefits from artists you support
          </p>
        </div>

        {/* Stats */}
        <div className="flex justify-center space-x-8 pt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {mockUserBenefits.filter((b) => b.status === "available").length}
            </div>
            <div className="text-sm text-gray-500">Available</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">
              {mockUserBenefits.filter((b) => b.status === "claimed").length}
            </div>
            <div className="text-sm text-gray-500">Claimed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">{benefitHistory.length}</div>
            <div className="text-sm text-gray-500">Total History</div>
          </div>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-xl">
          <TabsTrigger
            value="available"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Available ({mockUserBenefits.filter((b) => b.status === "available").length})
          </TabsTrigger>
          <TabsTrigger
            value="claimed"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            Claimed ({mockUserBenefits.filter((b) => b.status === "claimed").length})
          </TabsTrigger>
          <TabsTrigger
            value="history"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            History ({benefitHistory.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {mockUserBenefits
            .filter((benefit) => benefit.status === "available")
            .map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card key={benefit.id} className="border border-gray-100 hover:shadow-md transition-shadow">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img
                            src={benefit.artistImage || "/placeholder.svg"}
                            alt={benefit.artist}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                          />
                          <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-lg border border-gray-200">
                            <Icon className="h-3 w-3 text-gray-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold">{benefit.title}</CardTitle>
                          <CardDescription className="text-gray-600">by {benefit.artist}</CardDescription>
                          <p className="text-sm text-gray-600 mt-2">{benefit.description}</p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end space-y-2">
                        <Badge className={`${getRarityColor(benefit.rarity)} capitalize`}>{benefit.rarity}</Badge>
                        <Badge className="bg-green-100 text-green-700 border-green-200">Available</Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Expires: {new Date(benefit.expiresAt).toLocaleDateString()}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {benefit.tokenRequirement} tokens required
                        </Badge>
                      </div>

                      <Button
                        onClick={() => handleClaimBenefit(benefit.id)}
                        className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6 font-medium transition-colors"
                      >
                        <Gift className="mr-2 h-4 w-4" />
                        Claim Benefit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

          {mockUserBenefits.filter((b) => b.status === "available").length === 0 && (
            <Card className="bg-gradient-to-br from-gray-50 to-white border border-gray-100">
              <CardHeader className="text-center py-12">
                <Gift className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <CardTitle className="text-xl">No Benefits Available</CardTitle>
                <CardDescription className="text-gray-600">
                  Buy artist tokens to unlock exclusive benefits and experiences.
                </CardDescription>
                <Button className="mt-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl">Explore Artists</Button>
              </CardHeader>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="claimed" className="space-y-4">
          {mockUserBenefits
            .filter((benefit) => benefit.status === "claimed")
            .map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card key={benefit.id} className="border border-gray-100">
                  <CardHeader className="pb-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="relative">
                          <img
                            src={benefit.artistImage || "/placeholder.svg"}
                            alt={benefit.artist}
                            className="w-12 h-12 rounded-xl object-cover border border-gray-200"
                          />
                          <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-lg border border-gray-200">
                            <Icon className="h-3 w-3 text-blue-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold">{benefit.title}</CardTitle>
                          <CardDescription>by {benefit.artist}</CardDescription>
                          <p className="text-sm text-gray-600 mt-2">{benefit.description}</p>
                        </div>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Claimed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        Claimed on: {benefit.claimedAt ? new Date(benefit.claimedAt).toLocaleDateString() : "N/A"}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="rounded-lg bg-transparent">
                          <ExternalLink className="mr-2 h-4 w-4" />
                          View
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {benefitHistory.map((benefit) => (
            <Card key={benefit.id} className="border border-gray-100">
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <img
                    src={benefit.artistImage || "/placeholder.svg"}
                    alt={benefit.artist}
                    className="w-10 h-10 rounded-lg object-cover border border-gray-200"
                  />
                  <div>
                    <p className="font-medium text-gray-900">{benefit.title}</p>
                    <p className="text-sm text-gray-500">by {benefit.artist}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{benefit.value}</div>
                  <div className="text-sm text-gray-500">{new Date(benefit.claimedAt).toLocaleDateString()}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
