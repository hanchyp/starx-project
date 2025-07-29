"use client"

import { useEffect, useState } from "react"
import { useActiveAccount } from "thirdweb/react"
import { getContract, prepareContractCall, readContract, sendTransaction } from "thirdweb"
import { formatEther, parseEther } from "viem"
import { client, chain } from "@/app/client"
import { ShoppingCart } from "lucide-react"
import { tokenABI } from "@/abi/token"

interface Props {
  tokenAddress: string
  pricePerToken: bigint
}

export function BuyTokenSection({ tokenAddress, pricePerToken }: Props) {
  const account = useActiveAccount()
  const [tokenAmount, setTokenAmount] = useState("")
  const [requiredEth, setRequiredEth] = useState("0")
  const [ownerAddress, setOwnerAddress] = useState("")
  const [ownerBalance, setOwnerBalance] = useState("0")

  const contract = getContract({
    client,
    address: tokenAddress,
    chain,
    abi: tokenABI
  })

  // Fetch owner & balance
  useEffect(() => {
    const fetchOwnerAndBalance = async () => {
      if (!account) return

      try {
        const owner = await readContract({
          contract,
          method: "owner",
        })

        setOwnerAddress(owner)

        const balance = await readContract({
          contract,
          method: "balanceOf",
          params: [owner],
        })

        setOwnerBalance(formatEther(balance))
      } catch (err) {
        console.error("Error fetching owner or balance:", err)
      }
    }

    fetchOwnerAndBalance()
  }, [account, contract])

  // Calculate ETH required from token amount
  useEffect(() => {
    if (!tokenAmount || !pricePerToken) {
      setRequiredEth("0")
      return
    }

    try {
      const tokenQty = parseEther(tokenAmount) // token amount with 18 decimals
      const ethNeeded = (tokenQty * pricePerToken) / (10n ** 18n)
      setRequiredEth(formatEther(ethNeeded))
    } catch (err) {
      console.error("Calculation error:", err)
      setRequiredEth("0")
    }
  }, [tokenAmount, pricePerToken])

  const handleBuyTokens = async () => {
    if (!account || !tokenAmount) return alert("Masukkan jumlah token")
    if (account.address.toLowerCase() === ownerAddress.toLowerCase()) return alert("Owner tidak bisa membeli token")
    if (Number(ownerBalance) <= 0) return alert("Stok token kosong")

    try {
      const tokenQty = parseEther(tokenAmount)
      const ethToSend = (tokenQty * pricePerToken) / (10n ** 18n)

      const transaction = prepareContractCall({
        contract,
        method: "buyToken",
        value: ethToSend,
      })

      const tx = await sendTransaction({ transaction, account })

      alert(`Berhasil membeli token! TX Hash: ${tx.transactionHash}`)
      setTimeout(() => window.location.reload(), 2000)
    } catch (err: any) {
      console.error("Buy failed:", err)
      alert("Gagal membeli token: " + (err?.message || err))
    }
  }

  if (!account) {
    return (
      <div className="text-sm text-center text-muted-foreground">
        Connect wallet to buy tokens
      </div>
    )
  }

  return (
    <div className="p-6 border border-green-500 rounded-xl bg-background space-y-4">
      <h2 className="text-xl font-semibold text-green-500 flex items-center gap-2">
        <ShoppingCart className="w-5 h-5" />
        Buy Token ({formatEther(pricePerToken)} ETH/token)
      </h2>

      {account.address.toLowerCase() === ownerAddress.toLowerCase() && (
        <div className="bg-red-100 text-red-700 p-3 rounded border border-red-400">
          Sebagai owner, kamu tidak bisa membeli token sendiri.
        </div>
      )}

      {Number(ownerBalance) <= 0 && (
        <div className="bg-red-100 text-red-700 p-3 rounded border border-red-400">
          Token habis! Owner harus tambah stok.
        </div>
      )}

      <div>
        <label className="text-sm text-muted-foreground">Token Amount</label>
        <input
          type="number"
          step="0.01"
          min="0"
          placeholder="10"
          value={tokenAmount}
          onChange={(e) => setTokenAmount(e.target.value)}
          className="w-full p-2 bg-muted text-foreground rounded border border-green-400"
        />
      </div>

      {requiredEth !== "0" && (
        <div className="text-green-600">
          Estimasi Biaya: {Number(requiredEth)} ETH
        </div>
      )}

      <button
        onClick={handleBuyTokens}
        disabled={
          !tokenAmount ||
          parseFloat(tokenAmount) <= 0 ||
          parseFloat(tokenAmount) > parseFloat(ownerBalance) ||
          account.address.toLowerCase() === ownerAddress.toLowerCase()
        }
        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
      >
        {parseFloat(tokenAmount) > parseFloat(ownerBalance)
          ? "Stok tidak cukup"
          : "Beli Token"}
      </button>
    </div>
  )
}
