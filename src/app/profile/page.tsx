"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@/app/providers"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Music, TrendingUp, Edit, Copy, ExternalLink } from "lucide-react"

const mockUserData = {
  totalTokens: 185,
  totalValue: 18.5, // ETH
  artistsSupported: 8,
  benefitsClaimed: 23,
  portfolio: [
    {
      artist: "Luna Eclipse",
      tokens: 75,
      value: 7.5,
      change: "+12%",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      artist: "Neon Waves",
      tokens: 50,
      value: 4.0,
      change: "+8%",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      artist: "Digital Dreams",
      tokens: 40,
      value: 2.0,
      change: "+22%",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      artist: "Cyber Punk",
      tokens: 20,
      value: 2.4,
      change: "+5%",
      image: "/placeholder.svg?height=50&width=50",
    },
  ],
  recentTransactions: [
    {
      type: "buy",
      artist: "Luna Eclipse",
      amount: 25,
      price: 2.5,
      date: "2024-01-10",
      hash: "0xabcd...1234",
    },
    {
      type: "buy",
      artist: "Digital Dreams",
      amount: 40,
      price: 2.0,
      date: "2024-01-08",
      hash: "0xefgh...5678",
    },
    {
      type: "buy",
      artist: "Neon Waves",
      amount: 30,
      price: 2.4,
      date: "2024-01-05",
      hash: "0xijkl...9012",
    },
  ],
}

export default function ProfilePage() {
  const { user } = useWallet()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    bio: "Music enthusiast and Web3 supporter",
    twitter: "",
    discord: "",
  })

  const copyAddress = () => {
    if (user?.address) {
      navigator.clipboard.writeText(user.address)
      alert("Address copied to clipboard!")
    }
  }

  const handleSaveProfile = () => {
    setIsEditing(false)
    // Mock save
    alert("Profile updated successfully!")
  }

  if (!user) {
    return (
      <div className="text-center py-12">
        <User className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Connect Your Wallet</h2>
        <p className="text-muted-foreground">Connect your wallet to view your profile.</p>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold">My Profile</h1>
        <p className="text-muted-foreground">Manage your profile and view your token portfolio.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Profile</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)}>
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col items-center space-y-4">
                <Avatar className="h-20 w-20">
                  <AvatarFallback className="text-lg">{profileData.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>

                {isEditing ? (
                  <div className="w-full space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={profileData.twitter}
                        onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                        placeholder="@username"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discord">Discord</Label>
                      <Input
                        id="discord"
                        value={profileData.discord}
                        onChange={(e) => setProfileData({ ...profileData, discord: e.target.value })}
                        placeholder="username#1234"
                      />
                    </div>
                    <Button onClick={handleSaveProfile} className="w-full">
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-2">
                    <h3 className="text-xl font-semibold">{profileData.name}</h3>
                    <p className="text-sm text-muted-foreground">{profileData.bio}</p>
                    {user.isArtist && <Badge className="mt-2">Verified Artist</Badge>}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Wallet Address</Label>
                <div className="flex items-center space-x-2">
                  <code className="flex-1 p-2 bg-muted rounded text-sm">
                    {user.address.slice(0, 6)}...{user.address.slice(-4)}
                  </code>
                  <Button variant="ghost" size="sm" onClick={copyAddress}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Portfolio Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold">{mockUserData.totalTokens}</div>
                  <div className="text-sm text-muted-foreground">Total Tokens</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{mockUserData.totalValue}</div>
                  <div className="text-sm text-muted-foreground">ETH Value</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{mockUserData.artistsSupported}</div>
                  <div className="text-sm text-muted-foreground">Artists</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{mockUserData.benefitsClaimed}</div>
                  <div className="text-sm text-muted-foreground">Benefits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="portfolio" className="space-y-6">
            <TabsList>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-4">
              {mockUserData.portfolio.map((holding, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={holding.image || "/placeholder.svg"} alt={holding.artist} />
                        <AvatarFallback>{holding.artist.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{holding.artist}</h3>
                        <p className="text-sm text-muted-foreground">{holding.tokens} tokens</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{holding.value} ETH</div>
                      <div
                        className={`text-sm flex items-center ${
                          holding.change.startsWith("+") ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        <TrendingUp className="h-3 w-3 mr-1" />
                        {holding.change}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="transactions" className="space-y-4">
              {mockUserData.recentTransactions.map((tx, index) => (
                <Card key={index}>
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 rounded-full bg-green-500/10">
                        <Music className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">
                          Bought {tx.amount} {tx.artist} tokens
                        </h3>
                        <p className="text-sm text-muted-foreground">{new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold">{tx.price} ETH</div>
                      <Button variant="ghost" size="sm" className="mt-1">
                        <ExternalLink className="h-3 w-3 mr-1" />
                        View
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
