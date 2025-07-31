"use client"

import { formatEther } from "viem"
import { useActiveAccount } from "thirdweb/react"
import { FACTORY_ADDRESS } from "@/constants"
import { useIsArtist } from "@/hooks/useIsArtist"
import { CreateTokenButton } from "@/components/create-token-button"
import { useUserTokens } from "@/hooks/useUserTokens"


export default function ArtistDashboardPage() {
  const account = useActiveAccount()
  const { isArtist, loading } = useIsArtist(FACTORY_ADDRESS)
  console.log("Wallet:", account?.address)
  console.log("Is Artist?", isArtist)
  const { tokens, loading: tokenLoading } = useUserTokens(account?.address || "")

  if (loading) {
    return (
      <div className="text-center py-16 text-gray-500">Checking artist status...</div>
    )
  }

  // if (!isArtist) {
  //   return (
  //     <div className="text-center py-16">
  //       <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl border border-gray-100 p-12 max-w-md mx-auto">
  //         <Crown className="h-16 w-16 mx-auto text-gray-400 mb-6" />
  //         <h2 className="text-2xl font-semibold mb-3">Artist Access Required</h2>
  //         <p className="text-gray-600 mb-6">This dashboard is only available for verified artists.</p>
  //         <CreateTokenButton className="bg-gray-900 hover:bg-gray-800 text-white rounded-xl px-6">Apply for Artist Status</CreateTokenButton>
  //       </div>
  //     </div>
  //   )
  // }

  return (
    <div className="py-16 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-10">🎵 STARX Token Dashboard</h1>

      {tokenLoading ? (
        <div className="text-center text-gray-500">Loading your tokens...</div>
      ) : tokens.length === 0 ? (
        <div className="text-center text-gray-400">No active tokens with balance.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tokens.map((token) => (
            <div key={token.address} className="border rounded-xl p-4 shadow-sm text-left">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{token.name}</h1>
              <p className="text-sm text-gray-500 break-words">Token Address:</p>
              <p className="font-mono text-xs text-blue-700 break-words mb-2">{token.address}</p>
              <p className="text-sm">Balance: <span className="font-semibold">{formatEther(token.balance)} {token.symbol}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
