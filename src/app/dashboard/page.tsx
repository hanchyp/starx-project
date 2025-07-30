"use client"

import { useState } from "react"
import { useActiveAccount } from "thirdweb/react"
import { FACTORY_ADDRESS } from "@/constants"
import { useIsArtist } from "@/hooks/useIsArtist"
import { CreateTokenButton } from "@/components/create-token-button"
import { Music, ShoppingBag, Calendar, Award, Crown } from "lucide-react"
import SetRewardForm from "@/components/set-reward-form"


export default function ArtistDashboardPage() {
  const account = useActiveAccount()
  const { isArtist, loading } = useIsArtist(FACTORY_ADDRESS)
  console.log("Wallet:", account?.address)
  console.log("Is Artist?", isArtist)

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500">Checking artist status...</div>
    )
  }

  if (!isArtist) {
    return (
      <div className="text-center py-16">
        <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 p-12 max-w-md mx-auto">
          <Crown className="h-16 w-16 mx-auto text-gray-400 mb-6" />
          <h2 className="text-2xl font-semibold mb-3">Artist Access Required</h2>
          <p className="text-gray-600 mb-6">This dashboard is only available for verified artists.</p>
          <CreateTokenButton className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6">Apply for Artist Status</CreateTokenButton>
        </div>
      </div>
    )
  }

  return (
    <div className="text-center py-16">
        Artist
    </div>
  )
}
