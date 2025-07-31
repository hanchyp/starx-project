"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
  getContract,
  readContract,
  prepareContractCall,
  sendTransaction,
} from "thirdweb"
import { tokenABI } from "@/abi/token"
import { client, chain } from "@/app/client"
import { formatEther } from "viem"

type Props = {
  tokenAddress: string
  userAddress: string
}

export function HoldRewardCountdown({ tokenAddress, userAddress }: Props) {
  const [timeLeft, setTimeLeft] = useState<number | null>(null)
  const [eligible, setEligible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [claiming, setClaiming] = useState(false)
  const [holdReward, setHoldReward] = useState<string>("")

  const contract = getContract({
    address: tokenAddress,
    abi: tokenABI,
    client,
    chain,
  })

  useEffect(() => {
    async function fetchHoldData() {
      try {
        const [start, duration, minHoldAmountRaw, balanceRaw, holdRewardURI] = await Promise.all([
          readContract({
            contract,
            method: "holdingStart",
            params: [userAddress],
          }),
          readContract({
            contract,
            method: "minHoldDuration",
          }),
          readContract({
            contract,
            method: "minHoldAmount",
          }),
          readContract({
            contract,
            method: "balanceOf",
            params: [userAddress],
          }),
          readContract({
            contract,
            method: "holdRewardURI",
          }),
        ])

        const minHoldAmount = BigInt(minHoldAmountRaw)
        const balance = BigInt(balanceRaw)
        setHoldReward(holdRewardURI as string)

        if (balance < minHoldAmount) {
          setEligible(false)
          return
        }

        setEligible(true)

        const holdingStart = Number(start)
        const minHoldDuration = Number(duration)
        const targetTime = holdingStart + minHoldDuration

        const update = () => {
          const now = Math.floor(Date.now() / 1000)
          const remaining = targetTime - now
          setTimeLeft(remaining > 0 ? remaining : 0)
        }

        update()
        const interval = setInterval(update, 1000)

        return () => clearInterval(interval)
      } catch (err) {
        console.error("Error loading hold data:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchHoldData()
  }, [userAddress, tokenAddress])

  async function handleClaim() {
    try {
      setClaiming(true)
      const call = prepareContractCall({
        contract,
        method: "claimHoldReward",
        params: [],
      })
      await sendTransaction(call)
      alert("Reward claimed successfully!")
    } catch (err) {
      console.error("Claim failed:", err)
      alert("Gagal klaim reward.")
    } finally {
      setClaiming(false)
    }
  }

  function formatTime(seconds: number) {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = seconds % 60
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`
  }

  if (loading) return <p>Loading hold reward countdown...</p>

  if (!eligible || holdReward === "")
    return (
        <div></div>
    )

  return (
    <div className="mt-4">
      {timeLeft === 0 ? (
        <Button onClick={handleClaim} disabled={claiming}>
          {claiming ? "Claiming..." : "Claim Reward"}
        </Button>
      ) : (
        <p className="text-sm text-gray-600">
          Reward will available: {formatTime(timeLeft)}
        </p>
      )}
    </div>
  )
}
