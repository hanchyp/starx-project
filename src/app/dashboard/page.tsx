"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useWallet } from "@/app/providers"
import {
  TrendingUp,
  Users,
  DollarSign,
  Gift,
  Plus,
  Edit,
  Trash2,
  Music,
  ShoppingBag,
  Calendar,
  Award,
  BarChart3,
  Settings,
  Crown,
} from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const mockArtistData = {
  stats: {
    totalTokensSold: 7500,
    totalRevenue: 750,
    totalHolders: 2341,
    avgTokensPerHolder: 3.2,
  },
  benefits: [
    {
      id: 1,
      title: "Early Access Tier",
      description: "Get early access to new releases 48 hours before public",
      requiredTokens: 10,
      type: "purchase",
      benefitType: "music",
      active: true,
      claimedCount: 234,
    },
    {
      id: 2,
      title: "Exclusive Merch",
      description: "Free limited edition merchandise drops",
      requiredTokens: 25,
      type: "purchase",
      benefitType: "merch",
      active: true,
      claimedCount: 89,
    },
    {
      id: 3,
      title: "VIP Concert Access",
      description: "Priority booking for concerts and meet & greet",
      requiredTokens: 50,
      type: "purchase",
      benefitType: "event",
      active: true,
      claimedCount: 45,
    },
  ],
  recentActivity: [
    { type: "purchase", user: "0x1234...5678", amount: 25, timestamp: "2 hours ago" },
    { type: "benefit_claim", user: "0x9876...5432", benefit: "Early Access Tier", timestamp: "4 hours ago" },
    { type: "purchase", user: "0x5555...1111", amount: 10, timestamp: "6 hours ago" },
  ],
}

export default function ArtistDashboard() {
  const { user } = useWallet()
  const [isCreateBenefitOpen, setIsCreateBenefitOpen] = useState(false)
  const [newBenefit, setNewBenefit] = useState({
    title: "",
    description: "",
    requiredTokens: 10,
    type: "purchase",
    benefitType: "music",
    holdPeriod: "",
  })

  if (!user?.isArtist) {
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 p-12 max-w-md mx-auto">
          <Crown className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h2 className="text-2xl font-semibold mb-3">Artist Access Required</h2>
          <p className="text-gray-600 mb-6">This dashboard is only available for verified artists.</p>
          <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6">Apply for Artist Status</Button>
        </div>
      </div>
    )
  }

  const handleCreateBenefit = () => {
    console.log("Creating benefit:", newBenefit)
    setIsCreateBenefitOpen(false)
    setNewBenefit({
      title: "",
      description: "",
      requiredTokens: 10,
      type: "purchase",
      benefitType: "music",
      holdPeriod: "",
    })
  }

  const getBenefitIcon = (type: string) => {
    switch (type) {
      case "music":
        return Music
      case "merch":
        return ShoppingBag
      case "event":
        return Calendar
      default:
        return Award
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-50 via-white to-gray-50 rounded-3xl border border-gray-100 p-8">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-gray-900">Artist Dashboard</h1>
            <p className="text-lg text-gray-600">Manage your tokens, benefits, and track your community growth</p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="p-3 bg-white rounded-2xl shadow-sm border border-gray-100">
              <BarChart3 className="h-6 w-6 text-gray-700" />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="border border-gray-100 bg-gradient-to-br from-green-50 to-emerald-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Tokens Sold</CardTitle>
            <div className="p-2 bg-green-100 rounded-lg">
              <TrendingUp className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">
              {mockArtistData.stats.totalTokensSold.toLocaleString()}
            </div>
            <p className="text-xs text-green-600 font-medium">+12% from last month</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 bg-gradient-to-br from-blue-50 to-cyan-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Revenue (ETH)</CardTitle>
            <div className="p-2 bg-blue-100 rounded-lg">
              <DollarSign className="h-4 w-4 text-blue-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockArtistData.stats.totalRevenue}</div>
            <p className="text-xs text-blue-600 font-medium">+8% from last month</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 bg-gradient-to-br from-purple-50 to-pink-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Token Holders</CardTitle>
            <div className="p-2 bg-purple-100 rounded-lg">
              <Users className="h-4 w-4 text-purple-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockArtistData.stats.totalHolders.toLocaleString()}</div>
            <p className="text-xs text-purple-600 font-medium">+25% from last month</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-100 bg-gradient-to-br from-orange-50 to-yellow-50">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-gray-700">Avg Tokens/Holder</CardTitle>
            <div className="p-2 bg-orange-100 rounded-lg">
              <Gift className="h-4 w-4 text-orange-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockArtistData.stats.avgTokensPerHolder}</div>
            <p className="text-xs text-orange-600 font-medium">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="benefits" className="space-y-6">
        <TabsList className="bg-gray-100 p-1 rounded-xl">
          <TabsTrigger
            value="benefits"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <Gift className="mr-2 h-4 w-4" />
            Manage Benefits
          </TabsTrigger>
          <TabsTrigger value="tokens" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm">
            <Settings className="mr-2 h-4 w-4" />
            Token Settings
          </TabsTrigger>
          <TabsTrigger
            value="analytics"
            className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm"
          >
            <BarChart3 className="mr-2 h-4 w-4" />
            Analytics
          </TabsTrigger>
        </TabsList>

        <TabsContent value="benefits" className="space-y-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900">Benefit Tiers</h2>
              <p className="text-gray-600">Create and manage exclusive benefits for your token holders</p>
            </div>
            <Dialog open={isCreateBenefitOpen} onOpenChange={setIsCreateBenefitOpen}>
              <DialogTrigger asChild>
                <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6 font-medium">
                  <Plus className="mr-2 h-4 w-4" />
                  Create Benefit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px] rounded-2xl">
                <DialogHeader>
                  <DialogTitle className="text-xl">Create New Benefit</DialogTitle>
                  <DialogDescription>Set up a new benefit tier for your token holders.</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                  <div className="space-y-2">
                    <Label htmlFor="title">Benefit Title</Label>
                    <Input
                      id="title"
                      value={newBenefit.title}
                      onChange={(e) => setNewBenefit({ ...newBenefit, title: e.target.value })}
                      placeholder="e.g., Early Access Tier"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newBenefit.description}
                      onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                      placeholder="Describe what holders will get..."
                      className="rounded-xl"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="tokens">Required Tokens</Label>
                      <Input
                        id="tokens"
                        type="number"
                        value={newBenefit.requiredTokens}
                        onChange={(e) =>
                          setNewBenefit({ ...newBenefit, requiredTokens: Number.parseInt(e.target.value) })
                        }
                        className="rounded-xl"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="benefitType">Category</Label>
                      <Select
                        value={newBenefit.benefitType}
                        onValueChange={(value) => setNewBenefit({ ...newBenefit, benefitType: value })}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="music">Music Content</SelectItem>
                          <SelectItem value="merch">Merchandise</SelectItem>
                          <SelectItem value="event">Events & Access</SelectItem>
                          <SelectItem value="content">Exclusive Content</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
                <DialogFooter>
                  <Button
                    onClick={handleCreateBenefit}
                    className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6"
                  >
                    Create Benefit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {mockArtistData.benefits.map((benefit) => {
              const Icon = getBenefitIcon(benefit.benefitType)
              return (
                <Card key={benefit.id} className="border border-gray-100 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <div className="p-3 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200">
                          <Icon className="h-5 w-5 text-gray-700" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-lg font-semibold">{benefit.title}</CardTitle>
                          <CardDescription className="text-gray-600 mt-1">{benefit.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={benefit.active ? "default" : "secondary"} className="rounded-lg">
                          {benefit.active ? "Active" : "Inactive"}
                        </Badge>
                        <Button variant="ghost" size="sm" className="rounded-lg">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="rounded-lg text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-6 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{benefit.requiredTokens}</span>
                          <span>tokens required</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <span className="font-medium">{benefit.claimedCount}</span>
                          <span>claimed</span>
                        </div>
                        <Badge variant="outline" className="capitalize text-xs">
                          {benefit.type}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-6">
          <Card className="border border-gray-100">
            <CardHeader>
              <CardTitle className="text-xl">Token Configuration</CardTitle>
              <CardDescription>Manage your token settings and pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="tokenPrice">Token Price (ETH)</Label>
                  <Input id="tokenPrice" type="number" step="0.001" defaultValue="0.1" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxSupply">Maximum Supply</Label>
                  <Input id="maxSupply" type="number" defaultValue="10000" className="rounded-xl" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tokenDescription">Token Description</Label>
                <Textarea
                  id="tokenDescription"
                  placeholder="Describe your token and what it represents..."
                  defaultValue="Luna Eclipse tokens grant holders exclusive access to my music, merchandise, and live events."
                  className="rounded-xl"
                />
              </div>
              <Button className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6">
                Update Token Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <CardDescription>Latest transactions and benefit claims</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockArtistData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`p-2 rounded-lg ${activity.type === "purchase" ? "bg-green-100" : "bg-blue-100"}`}
                        >
                          {activity.type === "purchase" ? (
                            <TrendingUp className="h-4 w-4 text-green-600" />
                          ) : (
                            <Gift className="h-4 w-4 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">
                            {activity.type === "purchase"
                              ? `${activity.amount} tokens purchased`
                              : `Benefit claimed: ${activity.benefit}`}
                          </p>
                          <p className="text-xs text-gray-500">{activity.user}</p>
                        </div>
                      </div>
                      <span className="text-xs text-gray-500">{activity.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border border-gray-100">
              <CardHeader>
                <CardTitle className="text-lg">Top Token Holders</CardTitle>
                <CardDescription>Your biggest supporters</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { address: "0x1234...5678", tokens: 1250, percentage: 12.5 },
                    { address: "0x9876...5432", tokens: 890, percentage: 8.9 },
                    { address: "0x5555...1111", tokens: 650, percentage: 6.5 },
                    { address: "0x7777...3333", tokens: 420, percentage: 4.2 },
                    { address: "0x2222...9999", tokens: 380, percentage: 3.8 },
                  ].map((holder, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-blue-500 rounded-lg flex items-center justify-center text-white text-xs font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{holder.address}</p>
                          <p className="text-xs text-gray-500">{holder.percentage}% of supply</p>
                        </div>
                      </div>
                      <span className="text-sm font-semibold text-gray-900">{holder.tokens.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
