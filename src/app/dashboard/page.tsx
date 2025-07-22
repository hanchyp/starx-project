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
      <div className="text-center py-12">
        <Music className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-2xl font-bold mb-2">Artist Access Required</h2>
        <p className="text-muted-foreground">This dashboard is only available for verified artists.</p>
      </div>
    )
  }

  const handleCreateBenefit = () => {
    // Mock create benefit
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
      <div className="flex flex-col space-y-4">
        <h1 className="text-4xl font-bold">Artist Dashboard</h1>
        <p className="text-muted-foreground">Manage your tokens, benefits, and track your community growth.</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tokens Sold</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockArtistData.stats.totalTokensSold.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue (ETH)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockArtistData.stats.totalRevenue}</div>
            <p className="text-xs text-muted-foreground">+8% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Token Holders</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockArtistData.stats.totalHolders.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">+25% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Tokens/Holder</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockArtistData.stats.avgTokensPerHolder}</div>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="benefits" className="space-y-6">
        <TabsList>
          <TabsTrigger value="benefits">Manage Benefits</TabsTrigger>
          <TabsTrigger value="tokens">Token Settings</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="benefits" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold">Benefit Tiers</h2>
            <Dialog open={isCreateBenefitOpen} onOpenChange={setIsCreateBenefitOpen}>
              <DialogTrigger asChild>
                <Button>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Benefit
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Create New Benefit</DialogTitle>
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
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      value={newBenefit.description}
                      onChange={(e) => setNewBenefit({ ...newBenefit, description: e.target.value })}
                      placeholder="Describe what holders will get..."
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tokens">Required Tokens</Label>
                    <Input
                      id="tokens"
                      type="number"
                      value={newBenefit.requiredTokens}
                      onChange={(e) =>
                        setNewBenefit({ ...newBenefit, requiredTokens: Number.parseInt(e.target.value) })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="type">Requirement Type</Label>
                    <Select
                      value={newBenefit.type}
                      onValueChange={(value) => setNewBenefit({ ...newBenefit, type: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="purchase">One-time Purchase</SelectItem>
                        <SelectItem value="hold">Hold Period</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {newBenefit.type === "hold" && (
                    <div className="space-y-2">
                      <Label htmlFor="holdPeriod">Hold Period</Label>
                      <Input
                        id="holdPeriod"
                        value={newBenefit.holdPeriod}
                        onChange={(e) => setNewBenefit({ ...newBenefit, holdPeriod: e.target.value })}
                        placeholder="e.g., 3 months"
                      />
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="benefitType">Benefit Category</Label>
                    <Select
                      value={newBenefit.benefitType}
                      onValueChange={(value) => setNewBenefit({ ...newBenefit, benefitType: value })}
                    >
                      <SelectTrigger>
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
                <DialogFooter>
                  <Button onClick={handleCreateBenefit}>Create Benefit</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>

          <div className="space-y-4">
            {mockArtistData.benefits.map((benefit) => {
              const Icon = getBenefitIcon(benefit.benefitType)
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
                          <CardDescription>{benefit.description}</CardDescription>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant={benefit.active ? "default" : "secondary"}>
                          {benefit.active ? "Active" : "Inactive"}
                        </Badge>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{benefit.requiredTokens} tokens required</span>
                        <span>•</span>
                        <span>{benefit.claimedCount} claimed</span>
                        <span>•</span>
                        <span className="capitalize">{benefit.type} type</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Token Configuration</CardTitle>
              <CardDescription>Manage your token settings and pricing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="tokenPrice">Token Price (ETH)</Label>
                  <Input id="tokenPrice" type="number" step="0.001" defaultValue="0.1" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxSupply">Maximum Supply</Label>
                  <Input id="maxSupply" type="number" defaultValue="10000" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="tokenDescription">Token Description</Label>
                <Textarea
                  id="tokenDescription"
                  placeholder="Describe your token and what it represents..."
                  defaultValue="Luna Eclipse tokens grant holders exclusive access to my music, merchandise, and live events."
                />
              </div>
              <Button>Update Token Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockArtistData.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-1 rounded-full bg-primary/10">
                          {activity.type === "purchase" ? (
                            <TrendingUp className="h-3 w-3 text-primary" />
                          ) : (
                            <Gift className="h-3 w-3 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {activity.type === "purchase"
                              ? `${activity.amount} tokens purchased`
                              : `Benefit claimed: ${activity.benefit}`}
                          </p>
                          <p className="text-xs text-muted-foreground">{activity.user}</p>
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">{activity.timestamp}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Token Holders</CardTitle>
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
                    <div key={index} className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium">{holder.address}</p>
                        <p className="text-xs text-muted-foreground">{holder.percentage}% of supply</p>
                      </div>
                      <span className="text-sm font-bold">{holder.tokens.toLocaleString()}</span>
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
