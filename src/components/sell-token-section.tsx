"use client"

import { useEffect, useState } from "react"
import { useActiveAccount } from "thirdweb/react"
import { getContract, readContract, sendTransaction, prepareContractCall } from "thirdweb"
import { parseEther, formatEther } from "viem"
import { client, chain } from "@/app/client"
import { tokenABI } from "@/abi/token"
import { CircleDollarSign } from "lucide-react"

interface Props {
  tokenAddress: string
}

export function SellTokenSection({ tokenAddress }: Props) {
  const account = useActiveAccount()
  const [amount, setAmount] = useState("")
  const [tokenBalance, setTokenBalance] = useState("0")
  const [ownerAddress, setOwnerAddress] = useState("")
  const [symbol, setSymbol] = useState("")

  const contract = getContract({ client, address: tokenAddress, chain, abi: tokenABI })

  useEffect(() => {
    const fetchData = async () => {
      if (!account) return
      const [owner, balance, symbol] = await Promise.all([
        readContract({ contract, method: "owner" }),
        readContract({ contract, method: "balanceOf", params: [account.address] }),
        readContract({ contract, method: "symbol" }),
      ])
      setOwnerAddress(owner)
      setTokenBalance(formatEther(balance))
      setSymbol(symbol)
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
      <div className="p-6 border border-yellow-400 bg-yellow-50 rounded-xl text-yellow-700">
        As owner, you can't sell your own token.
      </div>
    )
  }

  return (
    <div className="p-6 border border-gray-300 rounded-xl bg-background space-y-4">
      <h2 className="text-xl font-semibold text-black flex items-center gap-2">
        <CircleDollarSign></CircleDollarSign>
        Sell Token
      </h2>
      <div className="text-sm text-muted-foreground">Your Balance: {tokenBalance} {symbol}</div>

      <input
        type="number"
        min="0"
        step="0.01"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="To be Sold Token"
        className="w-full p-2 bg-muted text-foreground rounded border border-gray-400"
      />

      <button
        onClick={handleSell}
        disabled={!amount || parseFloat(amount) <= 0}
        className="w-full bg-black hover:bg-gray-700 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
      >
        Sell Token
      </button>
    </div>
  )
}
