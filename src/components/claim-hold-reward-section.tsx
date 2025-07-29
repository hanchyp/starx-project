"use client"

import { useEffect, useState } from "react"
import { useActiveAccount } from "thirdweb/react"
import { getContract, readContract, sendTransaction, prepareContractCall } from "thirdweb"
import { client, chain } from "@/app/client"
import { tokenABI } from "@/abi/token"

interface Props {
  tokenAddress: string
}

export function ClaimHoldRewardSection({ tokenAddress }: Props) {
  const account = useActiveAccount()
  const [eligible, setEligible] = useState(false)
  const [loading, setLoading] = useState(true)
  const [ownerAddress, setOwnerAddress] = useState("")

  const contract = getContract({ client, address: tokenAddress, chain, abi: tokenABI })

  useEffect(() => {
    const checkEligibility = async () => {
      if (!account) return

      try {
        const owner = await readContract({ contract, method: "owner" })
        setOwnerAddress(owner)

        const [start, holdAmount, holdDuration, claimed, balance] = await Promise.all([
          readContract({ contract, method: "holdingStart", params: [account.address] }),
          readContract({ contract, method: "minHoldAmount" }),
          readContract({ contract, method: "minHoldDuration" }),
          readContract({ contract, method: "claimedHoldReward", params: [account.address] }),
          readContract({ contract, method: "balanceOf", params: [account.address] }),
        ])

        const now = BigInt(Math.floor(Date.now() / 1000))
        const hasWaited = now >= (start + holdDuration)
        setEligible(!claimed && balance >= holdAmount && hasWaited)
      } catch (err) {
        console.error("Eligibility check failed:", err)
        setEligible(false)
      } finally {
        setLoading(false)
      }
    }

    checkEligibility()
  }, [account, contract])

  const handleClaim = async () => {
    if (!account) return

    try {
      const tx = await sendTransaction({
        transaction: prepareContractCall({ contract, method: "claimHoldReward" }),
        account,
      })

      alert(`Reward berhasil diklaim! TX: ${tx.transactionHash}`)
      setTimeout(() => window.location.reload(), 2000)
    } catch (err: any) {
      console.error("Claim failed:", err)
      alert("Gagal klaim reward: " + err?.message)
    }
  }

  if (!account) {
    return <div className="text-sm text-center text-muted-foreground">Connect wallet untuk klaim hold reward</div>
  }

  if (account.address.toLowerCase() === ownerAddress.toLowerCase()) {
    return (
      <div className="mt-10 p-6 border border-purple-400 bg-purple-50 rounded-xl text-purple-700">
        Owner tidak bisa klaim hold reward.
      </div>
    )
  }

  if (loading) return null

  return (
    <div className="mt-10 p-6 border border-purple-400 bg-purple-50 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold text-purple-600">Hold Reward</h2>

      {eligible ? (
        <button
          onClick={handleClaim}
          className="w-full bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded font-medium"
        >
          Klaim Reward
        </button>
      ) : (
        <div className="text-muted-foreground text-sm">
          Kamu belum memenuhi syarat klaim reward hold.
        </div>
      )}
    </div>
  )
}
