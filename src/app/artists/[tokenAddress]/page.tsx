"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getContract, readContract } from "thirdweb"
import { tokenABI } from "@/abi/token"
import { formatEther } from "viem"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Loader, Music, Users, TrendingUp, Wallet, Send } from "lucide-react"
import { chain, client } from "@/app/client"
import { useActiveAccount } from "thirdweb/react"
import { BuyTokenSection } from "@/components/buy-token-section"
import { SellTokenSection } from "@/components/sell-token-section"
import { TransferTokenSection } from "@/components/transfer-token-section"
import { useIsArtist } from "@/hooks/useIsArtist"
import Link from "next/link"
import { FACTORY_ADDRESS } from "@/constants"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { HoldRewardCountdown } from "@/components/hold-reward-countdown"

export default function ArtistTokenPage() {
  const { tokenAddress } = useParams<{ tokenAddress: string }>()
  const [data, setData] = useState<any>(null)
  const [balance, setBalance] = useState<bigint | null>(null)
  const [availableSupply, setAvailableSupply] = useState<bigint | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [showBuySection, setShowBuySection] = useState(false)
  const [showSellSection, setShowSellSection] = useState(false)
  const [showTransferSection, setShowTransferSection] = useState(false)
  const activeAccount = useActiveAccount()
  const { isArtist, loading: isArtistLoading } = useIsArtist(FACTORY_ADDRESS)

  useEffect(() => {
    if (!tokenAddress || typeof tokenAddress !== "string") return

    const fetchTokenInfo = async () => {
      try {
        const contract = getContract({
          address: tokenAddress,
          abi: tokenABI,
          client,
          chain,
        })

        const name = await readContract({ contract, method: "name" })
        const [symbol, totalSupply, pricePerToken, purchaseRewardURI, holdRewardURI, tokenImageURI, descriptionURI, minPurchaseForReward, minHoldAmount, minHoldDuration] = await Promise.all([
          readContract({ contract, method: "symbol" }),
          readContract({ contract, method: "totalSupply" }),
          readContract({ contract, method: "pricePerToken" }),
          readContract({ contract, method: "purchaseRewardURI" }),
          readContract({ contract, method: "holdRewardURI" }),
          readContract({ contract, method: "tokenImageURI" }),
          readContract({ contract, method: "descriptionURI" }),
          readContract({ contract, method: "minPurchaseForReward" }),
          readContract({ contract, method: "minHoldAmount" }),
          readContract({ contract, method: "minHoldDuration" }),
        ])

        let description = ""
        let artistName = ""
        let imageURI = ""

        let purchaseReward = ""
        let holdReward = ""

        try {
          const descRes = await fetch(descriptionURI)
          const descJson = await descRes.json()
          description = descJson.description
          artistName = descJson.artistName
          
          imageURI = descJson.image
        } catch (jsonErr) {
          console.warn("Gagal fetch/parse descURI:", jsonErr)
        }

        try{
          const purcRes = await fetch(`https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/${purchaseRewardURI}`)
          const purcJson = await purcRes.json()
          const holdRes = await fetch(`https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/${holdRewardURI}`)
          const holdJson = await holdRes.json()

          purchaseReward = purcJson.name
          holdReward = holdJson.name
        } catch (jsonErr){
          console.warn('Reward is not set yet....: ', jsonErr)
        }

        setData({
          name,
          symbol,
          totalSupply,
          pricePerToken,
          purchaseRewardURI,
          holdRewardURI,
          tokenImageURI,
          description,
          artistName,
          imageURI,
          purchaseReward,
          holdReward,
          minPurchaseForReward,
          minHoldAmount,
          minHoldDuration
        })

        if (activeAccount?.address) {
          const userBalance = await readContract({
            contract,
            method: "balanceOf",
            params: [activeAccount.address],
          })
          setBalance(userBalance)
        }

        const owner = await readContract({ contract, method: "owner" })
        const ownerBalance = await readContract({
          contract,
          method: "balanceOf",
          params: [owner],
        })
        setAvailableSupply(ownerBalance)
      } catch (err: any) {
        console.error("Fetch error:", err)
        setError(err?.message || "Failed to fetch token data.")
      } finally {
        setLoading(false)
      }
    }

    fetchTokenInfo()
  }, [tokenAddress, activeAccount?.address])

  const handleAddToken = async () => {
    if (window.ethereum) {
      try {
        await window.ethereum.request({
          method: "wallet_watchAsset",
          params: {
            type: "ERC20",
            options: {
              address: tokenAddress,
              symbol: data.symbol,
              decimals: 18,
              image: "/logo.png",
            },
          },
        })
      } catch (error) {
        console.error("Failed to add token:", error)
      }
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-muted-foreground">
        <Loader className="animate-spin mr-2" />
        Loading artist profile...
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center py-20">{error}</div>
  }

  if (!data) {
    return <div className="text-muted-foreground text-center py-20">Artist not found.</div>
  }

  let minHoldDurationDay = data.minHoldDuration / BigInt(86400);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Artist Photo */}
            <div className="relative">
              <div className="w-48 h-48 rounded-full overflow-hidden border border-gray-200 shadow-lg bg-white">
                <img
                  src={data.tokenImageURI}
                  alt={data.name}
                  width={200}
                  height={200}
                  className="w-full h-full object-cover"
                />
              </div>
              <Badge className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white border-0">
                <Music className="w-3 h-3 mr-1" />
                Verified Artist
              </Badge>
            </div>

            {/* Artist Info */}
            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-light text-gray-900 mb-2">{data.name}</h1>
              <p className="text-xl text-gray-600 mb-6">${data.symbol} Token</p>

              {/* Stats */}
              <div className="flex flex-wrap justify-center md:justify-start gap-8 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-medium text-gray-900">
                    {Number(formatEther(data.totalSupply)).toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Total Supply</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-medium text-gray-900">{formatEther(data.pricePerToken)} ETH</div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Price per Token</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-medium text-gray-900">
                    {balance !== null ? Number(formatEther(balance)).toLocaleString() : "0"}
                  </div>
                  <div className="text-sm text-gray-500 uppercase tracking-wide">Your Balance</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <Button
                  size="lg"
                  className="bg-gray-900 text-white hover:bg-gray-800 border-0 px-8"
                  onClick={() => setShowBuySection(true)}
                >
                  <Wallet className="w-4 h-4 mr-2" />
                  Buy Tokens
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-white px-8"
                  onClick={() => setShowSellSection(true)}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Sell Tokens
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-white px-8"
                  onClick={() => setShowTransferSection(true)}
                >
                  <Send className="w-4 h-4 mr-2" />
                  Transfer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Description & Actions */}
          <div className="lg:col-span-2 space-y-8">
            {/* Artist Description */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="flex items-center gap-2 text-gray-900 font-medium">
                  <Users className="w-5 h-5 text-gray-600" />
                  About the Artist
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <p className="text-gray-600 leading-relaxed mb-4">
                  {data.description}
                </p>
                <p className="text-gray-600 leading-relaxed">
                  Join the community of supporters and be part of the future of music ownership. Token holders get
                  access to exclusive content, early releases, and special events.
                </p>
              </CardContent>
            </Card>

            {/* Interactive Sections */}
            <Dialog open={showBuySection} onOpenChange={setShowBuySection}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Buy {data.symbol} Token</DialogTitle>
                  <DialogDescription>
                    Buy {data.symbol} Token with ETH!
                  </DialogDescription>
                </DialogHeader>

                <BuyTokenSection
                  tokenAddress={tokenAddress}
                  pricePerToken={data.pricePerToken}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={showSellSection} onOpenChange={setShowSellSection}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Sell {data.symbol} Token</DialogTitle>
                  <DialogDescription>
                    Sell your {data.symbol} Token
                  </DialogDescription>
                </DialogHeader>

                <SellTokenSection
                  tokenAddress={tokenAddress}
                />
              </DialogContent>
            </Dialog>

            <Dialog open={showTransferSection} onOpenChange={setShowTransferSection}>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Transfer Token</DialogTitle>
                  <DialogDescription>
                    Transfer {data.symbol} Token to other wallet
                  </DialogDescription>
                </DialogHeader>
                <TransferTokenSection
                  tokenAddress={tokenAddress}
                />
              </DialogContent>
            </Dialog>

            

            {/* Rewards Section */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-gray-900 font-medium">Claim Rewards</CardTitle>
              </CardHeader>
              <CardContent className="">
                <Link href={`/artists/${tokenAddress}/benefit`}>
                    <Button
                      className="w-full"
                    >
                      Claim Your Rewards
                    </Button>
                  </Link>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Token Details */}
          <div className="space-y-8">
            {/* Token Info Card */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg text-gray-900 font-medium">Token Details</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">Contract Address</p>
                  <p className="font-mono text-xs break-all bg-gray-50 p-3 rounded-lg border border-gray-200">
                    {tokenAddress}
                  </p>
                </div>

                <Separator className="bg-gray-200" />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 uppercase tracking-wide">Available Supply</span>
                    <span className="font-medium text-gray-900">
                      {availableSupply !== null ? Number(formatEther(availableSupply)).toLocaleString() : "—"}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500 uppercase tracking-wide">Your Holdings</span>
                    <span className="font-medium text-gray-900">
                      {balance !== null ? Number(formatEther(balance)).toLocaleString() : "0"}
                    </span>
                  </div>
                </div>

                <Separator className="bg-gray-200" />

                <div className="space-y-3">
                  <Button
                    onClick={handleAddToken}
                    variant="outline"
                    className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent mb-3"
                  >
                    Add to Wallet
                  </Button>

                  {isArtist && (
                    <Link href={`/artists/${tokenAddress}/setreward`}>
                      <Button
                        variant="outline"
                        className="w-full border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent mb-3"
                      >
                        Set Reward
                      </Button>
                    </Link>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Rewards Info Card */}
            <Card className="border-gray-200 shadow-sm">
              <CardHeader className="border-b border-gray-100">
                <CardTitle className="text-lg text-gray-900 font-medium">Reward Information</CardTitle>
              </CardHeader>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                    Purchase Reward
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1">
                    <p className="text-xs font-mono break-all">
                      {data.purchaseReward || "Not set"}
                    </p>
                    <div className="flex justify-end">
                      <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                        Min. {formatEther(data.minPurchaseForReward)} {data.symbol}
                      </span>
                    </div>
                  </div>
                </div>



                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">
                    Hold Reward
                  </p>
                  <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 space-y-1">
                    <p className="text-xs font-mono break-all">
                      {data.holdReward || "Not set"}
                    </p>
                    <div className="flex justify-end">
                      <span className="text-[11px] text-gray-500 bg-gray-100 px-2 py-0.5 rounded-md">
                        {formatEther(data.minHoldAmount)} {data.symbol} for {minHoldDurationDay} days
                      </span>
                    </div>
                    <HoldRewardCountdown tokenAddress={tokenAddress} userAddress={activeAccount?.address} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
