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
    <div className="w-80 bg-white border border-gray-100 rounded-2xl shadow-xl flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-gray-50">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-medium text-gray-900">Artist Benefits</h3>
          <Button variant="ghost" size="sm" className="text-gray-400 hover:text-gray-600 p-1 h-8 w-8">
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-xl overflow-hidden border border-gray-100">
            <img src={artist.image || "/placeholder.svg"} alt={artist.name} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="font-medium text-gray-900">{artist.name}</h4>
            <p className="text-sm text-gray-500 font-mono">${artist.symbol}</p>
          </div>
        </div>
      </div>

      {/* Token Info */}
      <div className="p-6 bg-gray-50/50">
        <div className="grid grid-cols-2 gap-6">
          <div className="text-center">
            <p className="text-2xl font-light text-gray-900 mb-1">{artist.price}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Token Price</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-light text-gray-900 mb-1">{artist.holders || "2.4k"}</p>
            <p className="text-xs text-gray-500 uppercase tracking-wide">Holders</p>
          </div>
        </div>

        <Button className="w-full mt-6 bg-gray-900 hover:bg-gray-800 text-white font-medium rounded-xl h-11">
          Buy Tokens
        </Button>
      </div>

      {/* Benefits List */}
      <div className="flex-1 overflow-y-auto p-6">
        <h5 className="text-sm font-medium text-gray-900 mb-4 flex items-center">
          <Gift className="h-4 w-4 mr-2 text-gray-600" />
          Exclusive Benefits
        </h5>

        <div className="space-y-3">
          {artist.benefits?.map((benefit: string, index: number) => {
            const Icon = benefitIcons[index % benefitIcons.length]

            return (
              <div
                key={index}
                className="flex items-start space-x-3 p-4 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors border border-gray-50"
              >
                <div className="p-2 rounded-lg bg-white border border-gray-100">
                  <Icon className="h-4 w-4 text-gray-600" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900 font-medium leading-relaxed">{benefit}</p>
                  <div className="flex items-center mt-2">
                    <Badge variant="secondary" className="text-xs bg-gray-100 text-gray-600 border-0 font-normal">
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
      <div className="p-6 space-y-3 border-t border-gray-50">
        <Button
          variant="outline"
          className="w-full text-gray-700 hover:bg-gray-50 border-gray-200 rounded-xl h-11 bg-transparent"
        >
          View All Benefits
        </Button>
        <Button variant="ghost" className="w-full text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-xl h-11">
          Artist Profile
        </Button>
      </div>
    </div>
  )
}
