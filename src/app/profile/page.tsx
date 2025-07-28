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
import { User, Music, TrendingUp, Edit, Copy, ExternalLink, Wallet, Star, Trophy } from "lucide-react"

const mockUserData = {
  totalTokens: 185,
  totalValue: 18.5,
  artistsSupported: 8,
  benefitsClaimed: 23,
  portfolio: [
    {
      artist: "Taylor Swift",
      tokens: 75,
      value: 7.5,
      change: "+12%",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      artist: "The Weeknd",
      tokens: 50,
      value: 4.0,
      change: "+8%",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      artist: "Billie Eilish",
      tokens: 40,
      value: 2.0,
      change: "+22%",
      image: "/placeholder.svg?height=50&width=50",
    },
    {
      artist: "Drake",
      tokens: 20,
      value: 2.4,
      change: "+5%",
      image: "/placeholder.svg?height=50&width=50",
    },
  ],
  recentTransactions: [
    {
      type: "buy",
      artist: "Taylor Swift",
      amount: 25,
      price: 2.5,
      date: "2024-01-10",
      hash: "0xabcd...1234",
    },
    {
      type: "buy",
      artist: "Billie Eilish",
      amount: 40,
      price: 2.0,
      date: "2024-01-08",
      hash: "0xefgh...5678",
    },
    {
      type: "buy",
      artist: "The Weeknd",
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
    alert("Profile updated successfully!")
  }

  if (!user) {
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 p-12 max-w-md mx-auto">
          <Wallet className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h2 className="text-2xl font-semibold mb-3">Connect Your Wallet</h2>
          <p className="text-gray-600 mb-6">Connect your wallet to view your profile and portfolio.</p>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6">Connect Wallet</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">My Profile</h1>
            <p className="text-lg text-gray-600">Manage your profile and view your token portfolio</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
              <User className="h-6 w-6 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="border border-gray-100">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Profile Information</CardTitle>
                <Button variant="ghost" size="sm" onClick={() => setIsEditing(!isEditing)} className="rounded-lg">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col items-center space-y-4">
                <div className="relative">
                  <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                    <AvatarFallback className="text-xl bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                      {profileData.name.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  {user.isArtist && (
                    <div className="absolute -bottom-1 -right-1 p-1 bg-yellow-400 rounded-full border-2 border-white">
                      <Star className="h-3 w-3 text-white fill-current" />
                    </div>
                  )}
                </div>

                {isEditing ? (
                  <div className="w-full space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Input
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter</Label>
                      <Input
                        id="twitter"
                        value={profileData.twitter}
                        onChange={(e) => setProfileData({ ...profileData, twitter: e.target.value })}
                        placeholder="@username"
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="discord">Discord</Label>
                      <Input
                        id="discord"
                        value={profileData.discord}
                        onChange={(e) => setProfileData({ ...profileData, discord: e.target.value })}
                        placeholder="username#1234"
                        className="rounded-xl"
                      />
                    </div>
                    <Button
                      onClick={handleSaveProfile}
                      className="w-full bg-gray-900 hover:bg-gray-800 text-white rounded-xl"
                    >
                      Save Changes
                    </Button>
                  </div>
                ) : (
                  <div className="text-center space-y-3">
                    <h3 className="text-xl font-semibold text-gray-900">{profileData.name}</h3>
                    <p className="text-sm text-gray-600">{profileData.bio}</p>
                    <div className="flex justify-center space-x-2">
                      {user.isArtist && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                          <Trophy className="mr-1 h-3 w-3" />
                          Verified Artist
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <Label className="text-sm font-medium text-gray-700">Wallet Address</Label>
                <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-xl border border-gray-200">
                  <code className="flex-1 text-sm font-mono text-gray-700">
                    {user.address.slice(0, 6)}...{user.address.slice(-4)}
                  </code>
                  <Button variant="ghost" size="sm" onClick={copyAddress} className="rounded-lg">
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="text-lg">Portfolio Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl border border-green-100">
                  <div className="text-2xl font-bold text-gray-900">{mockUserData.totalTokens}</div>
                  <div className="text-sm text-gray-600">Total Tokens</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                  <div className="text-2xl font-bold text-gray-900">{mockUserData.totalValue}</div>
                  <div className="text-sm text-gray-600">ETH Value</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl border border-purple-100">
                  <div className="text-2xl font-bold text-gray-900">{mockUserData.artistsSupported}</div>
                  <div className="text-sm text-gray-600">Artists</div>
                </div>
                <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-yellow-50 rounded-xl border border-orange-100">
                  <div className="text-2xl font-bold text-gray-900">{mockUserData.benefitsClaimed}</div>
                  <div className="text-sm text-gray-600">Benefits</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="portfolio" className="space-y-6">
            <TabsList className="bg-gray-100 p-1 rounded-xl">
              <TabsTrigger
                value="portfolio"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Portfolio ({mockUserData.portfolio.length})
              </TabsTrigger>
              <TabsTrigger
                value="transactions"
                className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Transactions ({mockUserData.recentTransactions.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="portfolio" className="space-y-4">
              {mockUserData.portfolio.map((holding, index) => (
                <Card key={index} className="border border-gray-100 hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <Avatar className="h-12 w-12 border border-gray-200">
                        <AvatarImage src={holding.image || "/placeholder.svg"} alt={holding.artist} />
                        <AvatarFallback className="bg-gray-100 text-gray-600">
                          {holding.artist.slice(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{holding.artist}</h3>
                        <p className="text-sm text-gray-600">{holding.tokens} tokens</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{holding.value} ETH</div>
                      <div
                        className={`text-sm flex items-center justify-end ${
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
                <Card key={index} className="border border-gray-100 hover:shadow-md transition-shadow">
                  <CardContent className="flex items-center justify-between p-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-xl bg-green-100 border border-green-200">
                        <Music className="h-4 w-4 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          Bought {tx.amount} {tx.artist} tokens
                        </h3>
                        <p className="text-sm text-gray-600">{new Date(tx.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-gray-900">{tx.price} ETH</div>
                      <Button variant="ghost" size="sm" className="mt-1 rounded-lg">
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
