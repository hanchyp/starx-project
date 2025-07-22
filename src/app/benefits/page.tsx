"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@/app/providers"
import { Gift, Clock, CheckCircle, Music, ShoppingBag, Calendar, Award, Download, ExternalLink } from "lucide-react"

const mockUserBenefits = [
  {
    id: 1,
    artist: "Luna Eclipse",
    title: "Early Access: Midnight Pulse",
    description: "New single available 48 hours before public release",
    type: "music",
    status: "available",
    expiresAt: "2024-01-15",
    claimedAt: null,
    tokenRequirement: 10,
    icon: Music,
  },
  {
    id: 2,
    artist: "Luna Eclipse",
    title: "Limited Edition Holographic T-Shirt",
    description: "Exclusive merchandise drop for token holders",
    type: "merch",
    status: "claimed",
    expiresAt: "2024-01-20",
    claimedAt: "2024-01-10",
    tokenRequirement: 25,
    icon: ShoppingBag,
  },
  {
    id: 3,
    artist: "Neon Waves",
    title: "VIP Concert Access",
    description: "Priority booking for upcoming tour dates",
    type: "event",
    status: "available",
    expiresAt: "2024-02-01",
    claimedAt: null,
    tokenRequirement: 50,
    icon: Calendar,
  },
  {
    id: 4,
    artist: "Digital Dreams",
    title: "Studio Session Recording",
    description: "Exclusive behind-the-scenes studio content",
    type: "content",
    status: "expired",
    expiresAt: "2024-01-05",
    claimedAt: null,
    tokenRequirement: 100,
    icon: Award,
  },
]

const benefitHistory = [
  {
    id: 1,
    artist: "Luna Eclipse",
    title: 'Demo Track: "Neon Dreams"',
    claimedAt: "2023-12-15",
    type: "music",
  },
  {
    id: 2,
    artist: "Neon Waves",
    title: "Signed Vinyl Record",
    claimedAt: "2023-12-10",
    type: "merch",
  },
  {
    id: 3,
    artist: "Digital Dreams",
    title: "Virtual Meet & Greet",
    claimedAt: "2023-12-05",
    type: "event",
  },
]

export default function BenefitsPage() {
  const { isConnected } = useWallet()
  const [activeTab, setActiveTab] = useState("available")

  const handleClaimBenefit = async (benefitId: number) => {
    // Mock claim process
    await new Promise((resolve) => setTimeout(resolve, 1000))
    alert("Benefit claimed successfully!")
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

  const getStatusText = (status: string) => {
    switch (status) {
      case "available":
        return "Available"
      case "claimed":
        return "Claimed"
      case "expired":
        return "Expired"
      default:
        return "Unknown"
    }
  }

  if (!isConnected) {
    return (
      <div className="text-center py-12">
        <Gift className="h-16 w-16 mx-auto text-gray-400 mb-4" />
        <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
        <p className="text-gray-600">Connect your wallet to view and claim your benefits.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          My Benefits
        </h1>
        <p className="text-gray-600">Manage and claim your exclusive benefits from artists you support.</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="available">Available</TabsTrigger>
          <TabsTrigger value="claimed">Claimed</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="available" className="space-y-4">
          {mockUserBenefits
            .filter((benefit) => benefit.status === "available")
            .map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card key={benefit.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 rounded-full bg-primary/10">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{benefit.title}</CardTitle>
                          <CardDescription>by {benefit.artist}</CardDescription>
                        </div>
                      </div>
                      <Badge className={getStatusColor(benefit.status)}>{getStatusText(benefit.status)}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{benefit.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>Expires: {new Date(benefit.expiresAt).toLocaleDateString()}</span>
                        </div>
                        <Badge variant="outline">{benefit.tokenRequirement} tokens required</Badge>
                      </div>

                      <Button onClick={() => handleClaimBenefit(benefit.id)}>
                        <Gift className="mr-2 h-4 w-4" />
                        Claim Benefit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}

          {mockUserBenefits.filter((b) => b.status === "available").length === 0 && (
            <Card className="bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle>No Benefits Available</CardTitle>
                <CardDescription>Buy artist tokens to unlock exclusive benefits.</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Start investing in your favorite artists to see benefits here!</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="claimed" className="space-y-4">
          {mockUserBenefits
            .filter((benefit) => benefit.status === "claimed")
            .map((benefit) => {
              const Icon = benefit.icon
              return (
                <Card key={benefit.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-2 rounded-full bg-blue-500/10">
                          <Icon className="h-5 w-5 text-blue-500" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{benefit.title}</CardTitle>
                          <CardDescription>by {benefit.artist}</CardDescription>
                        </div>
                      </div>
                      <Badge className="bg-blue-500">
                        <CheckCircle className="mr-1 h-3 w-3" />
                        Claimed
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{benefit.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-muted-foreground">
                        Claimed on: {benefit.claimedAt ? new Date(benefit.claimedAt).toLocaleDateString() : "N/A"}
                      </div>

                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm">
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
            <Card key={benefit.id}>
              <CardContent className="flex items-center justify-between p-6">
                <div className="flex items-center space-x-4">
                  <div className="p-2 rounded-full bg-muted">
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="font-medium">{benefit.title}</p>
                    <p className="text-sm text-muted-foreground">by {benefit.artist}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">{new Date(benefit.claimedAt).toLocaleDateString()}</div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
