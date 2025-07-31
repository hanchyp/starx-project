"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { getContract, readContract } from "thirdweb"
import { tokenABI } from "@/abi/token"
import { formatEther, parseEther } from "viem"
import { useActiveAccount } from "thirdweb/react"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader } from "lucide-react"
import { chain, client } from "@/app/client"

const GATEWAY = "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/"

export default function ArtistPage() {
  const { tokenAddress } = useParams()
  const account = useActiveAccount()

  const [name, setName] = useState("")
  const [symbol, setSymbol] = useState("")
  const [price, setPrice] = useState("")
  const [balance, setBalance] = useState<bigint>(0)

  const [minPurchase, setMinPurchase] = useState("")
  const [minHold, setMinHold] = useState("")
  const [minHoldDuration, setMinHoldDuration] = useState(0)
  const [holdStart, setHoldStart] = useState<number>(0)

  const [claimedPurchase, setClaimedPurchase] = useState(false)
  const [claimedHold, setClaimedHold] = useState(false)

  const [purchaseReward, setPurchaseReward] = useState<any>(null)
  const [holdReward, setHoldReward] = useState<any>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!tokenAddress || !account) return

    async function fetchData() {
      try {
        setLoading(true)

        const contract = getContract({
          address: tokenAddress as string,
          abi: tokenABI,
          client,
          chain
        })

        const [
          name,
          symbol,
          price,
          minPurchase,
          minHold,
          minHoldDuration,
          purchaseURI,
          holdURI,
          userBalance,
          holdStart,
          claimedPurchase,
          claimedHold,
        ] = await Promise.all([
          readContract({ contract, method: "name" }),
          readContract({ contract, method: "symbol" }),
          readContract({ contract, method: "pricePerToken" }),
          readContract({ contract, method: "minPurchaseForReward" }),
          readContract({ contract, method: "minHoldAmount" }),
          readContract({ contract, method: "minHoldDuration" }),
          readContract({ contract, method: "purchaseRewardURI" }),
          readContract({ contract, method: "holdRewardURI" }),
          readContract({ contract, method: "balanceOf", params: [account.address] }),
          readContract({ contract, method: "holdingStart", params: [account.address] }),
          readContract({ contract, method: "claimedPurchaseReward", params: [account.address] }),
          readContract({ contract, method: "claimedHoldReward", params: [account.address] }),
        ])

        setName(name as string)
        setSymbol(symbol as string)
        setPrice(formatEther(price as bigint))
        setMinPurchase(formatEther(minPurchase as bigint))
        setMinHold(formatEther(minHold as bigint))
        setMinHoldDuration(Number(minHoldDuration) / 86400)
        setBalance(userBalance as bigint)
        setHoldStart(Number(holdStart))
        setClaimedPurchase(Boolean(claimedPurchase))
        setClaimedHold(Boolean(claimedHold))

        // Fetch metadata from IPFS
        const purchaseMeta = await fetch(`${GATEWAY}${(purchaseURI as string).replace("ipfs://", "")}`).then(res => res.json())
        const holdMeta = await fetch(`${GATEWAY}${(holdURI as string).replace("ipfs://", "")}`).then(res => res.json())
        setPurchaseReward(purchaseMeta)
        setHoldReward(holdMeta)
      } catch (err) {
        console.error("Error fetching token data", err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [tokenAddress, account])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader className="animate-spin" />
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>$ {symbol}</p>
          <p>Price per Token: {price} ETH</p>
          <p>Your Balance: {formatEther(balance)} {symbol}</p>
        </CardContent>
      </Card>

      <Separator />

      {balance >= BigInt(parseEther(minPurchase)) && (
        <Card>
          <CardHeader>
            <CardTitle>Purchase Reward</CardTitle>
          </CardHeader>
          <CardContent className="flex items-start justify-between gap-6">
            <div className="flex-1">
              <p className="font-semibold">{purchaseReward.name}</p>
              <p className="text-sm text-gray-500">{purchaseReward.description}</p>
            </div>

            <img
              src={`${GATEWAY}${purchaseReward.image.replace("ipfs://", "")}`}
              alt="Purchase Reward"
              className="rounded-lg w-32 md:w-40 object-cover"
            />
          </CardContent>

        </Card>
      )}

      {!claimedHold &&
        holdReward &&
        balance >= BigInt(parseEther(minHold)) &&
        holdStart > 0 &&
        Date.now() / 1000 >= holdStart + minHoldDuration * 86400 && (
          <Card>
            <CardHeader>
              <CardTitle>Hold Reward</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <p className="font-semibold">{holdReward.name}</p>
              <p className="text-sm text-gray-500">{holdReward.description}</p>
              <p className="text-sm">Requires holding for {minHoldDuration} days</p>
              <img
                src={`${GATEWAY}${holdReward.image.replace("ipfs://", "")}`}
                alt="Hold Reward"
                className="rounded-lg w-64 mt-4"
              />
            </CardContent>
          </Card>
        )}
    </div>
  )
}
