"use client"

import { useEffect, useState } from "react"
import { useActiveAccount } from "thirdweb/react"
import { getContract, readContract, sendTransaction, prepareContractCall } from "thirdweb"
import { parseEther, formatEther } from "viem"
import { client, chain } from "@/app/client"
import { tokenABI } from "@/abi/token"

interface Props {
  tokenAddress: string
}

export function SellTokenSection({ tokenAddress }: Props) {
  const account = useActiveAccount()
  const [amount, setAmount] = useState("")
  const [tokenBalance, setTokenBalance] = useState("0")
  const [ownerAddress, setOwnerAddress] = useState("")

  const contract = getContract({ client, address: tokenAddress, chain, abi: tokenABI })

  useEffect(() => {
    const fetchData = async () => {
      if (!account) return
      const [owner, balance] = await Promise.all([
        readContract({ contract, method: "owner" }),
        readContract({ contract, method: "balanceOf", params: [account.address] }),
      ])
      setOwnerAddress(owner)
      setTokenBalance(formatEther(balance))
    }
    fetchData()
  }, [account, contract])

  const handleSell = async () => {
    if (!account || !amount) return
    const parsedAmount = parseEther(amount)

    try {
      const transaction = prepareContractCall({
        contract,
        method: "sellToken",
        params: [parsedAmount],
      })
      const tx = await sendTransaction({ transaction, account })
      alert(`Token berhasil dijual! TX: ${tx.transactionHash}`)
      setTimeout(() => window.location.reload(), 2000)
    } catch (err: any) {
      console.error("Sell failed:", err)
      alert("Gagal menjual token: " + err?.message)
    }
  }

  if (!account) {
    return <div className="text-sm text-center text-muted-foreground">Connect wallet untuk jual token</div>
  }

  if (account.address.toLowerCase() === ownerAddress.toLowerCase()) {
    return (
      <div className="mt-10 p-6 border border-yellow-400 bg-yellow-50 rounded-xl text-yellow-700">
        Sebagai owner, kamu tidak bisa menjual token ke kontrak sendiri.
      </div>
    )
  }

  return (
    <div className="mt-10 p-6 border border-yellow-400 bg-yellow-50 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold text-yellow-600">Sell Token</h2>
      <div className="text-sm text-muted-foreground">Saldo: {tokenBalance} token</div>

      <input
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Jumlah token"
        className="w-full p-2 bg-muted text-foreground rounded border border-yellow-400"
      />

      <button
        onClick={handleSell}
        disabled={!amount || parseFloat(amount) <= 0}
        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
      >
        Jual Token
      </button>
    </div>
  )
}
