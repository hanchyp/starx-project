"use client"

import { X, Gift, Music, Star, Calendar, Users, Headphones, ShoppingBag } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface BenefitPanelProps {
  artist: any
}

export function BenefitPanel({ artist }: BenefitPanelProps) {
  if (!artist) return null

  const benefitIcons = [Music, Star, Calendar, Gift, Users, Headphones, ShoppingBag]

  return (
    <div className="w-80 bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Artist Benefits</h3>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-1">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-3">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${artist.gradient} p-0.5`}>
            <div className="w-full h-full rounded-lg overflow-hidden">
              <img src={artist.image || "/placeholder.svg"} alt={artist.name} className="w-full h-full object-cover" />
            </div>
          </div>
          <div>
            <h4 className="font-medium text-white">{artist.name}</h4>
            <p className="text-sm text-gray-400">{artist.symbol}</p>
          </div>
        </div>
      </div>

      {/* Token Info */}
      <div className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-400">{artist.price} ETH</p>
            <p className="text-xs text-gray-400">Token Price</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-blue-400">{artist.holders}</p>
            <p className="text-xs text-gray-400">Holders</p>
          </div>
        </div>

        <Button className="w-full mt-4 bg-green-500 hover:bg-green-600 text-black font-semibold">Buy Tokens</Button>
      </div>

      {/* Benefits List */}
      <div className="flex-1 overflow-y-auto p-4">
        <h5 className="text-sm font-semibold text-white mb-3 flex items-center">
          <Gift className="h-4 w-4 mr-2" />
          Exclusive Benefits
        </h5>

        <div className="space-y-3">
          {artist.benefits?.map((benefit: string, index: number) => {
            const Icon = benefitIcons[index % benefitIcons.length]
            const colors = [
              "text-purple-400",
              "text-yellow-400",
              "text-blue-400",
              "text-green-400",
              "text-pink-400",
              "text-cyan-400",
              "text-orange-400",
            ]
            const bgColors = [
              "bg-purple-500/10",
              "bg-yellow-500/10",
              "bg-blue-500/10",
              "bg-green-500/10",
              "bg-pink-500/10",
              "bg-cyan-500/10",
              "bg-orange-500/10",
            ]

            return (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-800 transition-colors"
              >
                <div className={`p-2 rounded-lg ${bgColors[index % bgColors.length]}`}>
                  <Icon className={`h-4 w-4 ${colors[index % colors.length]}`} />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-white font-medium">{benefit}</p>
                  <div className="flex items-center mt-1">
                    <Badge variant="secondary" className="text-xs bg-gray-700 text-gray-300">
                      {10 * (index + 1)} tokens required
                    </Badge>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 space-y-2">
        <Button variant="outline" className="w-full text-white hover:bg-gray-800 bg-transparent">
          View All Benefits
        </Button>
        <Button variant="ghost" className="w-full text-gray-400 hover:text-white hover:bg-gray-800">
          Artist Profile
        </Button>
      </div>
    </div>
  )
}
