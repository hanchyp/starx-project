"use client"

import { useState } from "react"
import { getContract, prepareContractCall, sendTransaction } from "thirdweb"
import { parseEther } from "viem"
import { useActiveAccount } from "thirdweb/react"
import { client, chain } from "@/app/client"
import { tokenABI } from "@/abi/token"

interface Props {
  tokenAddress: string
}

export function TransferTokenSection({ tokenAddress }: Props) {
  const account = useActiveAccount()
  const [recipient, setRecipient] = useState("")
  const [amount, setAmount] = useState("")

  const contract = getContract({ client, address: tokenAddress, chain, abi: tokenABI })

  const handleTransfer = async () => {
    if (!recipient || !amount || !account) return

    if (recipient.toLowerCase() === account.address.toLowerCase()) {
      alert("Tidak bisa kirim ke diri sendiri.")
      return
    }

    try {
      const parsedAmount = parseEther(amount)
      const transaction = prepareContractCall({
        contract,
        method: "transfer",
        params: [recipient, parsedAmount],
      })
      const tx = await sendTransaction({ transaction, account })
      alert(`Token berhasil dikirim! TX: ${tx.transactionHash}`)
    } catch (err: any) {
      console.error("Transfer failed:", err)
      alert("Gagal kirim token: " + err?.message)
    }
  }

  if (!account) {
    return <div className="text-sm text-center text-muted-foreground">Connect wallet untuk transfer token</div>
  }

  return (
    <div className="mt-10 p-6 border border-blue-400 bg-blue-50 rounded-xl space-y-4">
      <h2 className="text-xl font-semibold text-blue-600">Transfer Token</h2>

      <div>
        <label className="text-sm">Recipient Address</label>
        <input
          type="text"
          value={recipient}
          onChange={(e) => setRecipient(e.target.value)}
          placeholder="0x..."
          className="w-full p-2 bg-muted text-foreground rounded border border-blue-400"
        />
      </div>

      <div>
        <label className="text-sm">Amount</label>
        <input
          type="number"
          step="0.01"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 bg-muted text-foreground rounded border border-blue-400"
        />
      </div>

      <button
        onClick={handleTransfer}
        disabled={!recipient || !amount}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded font-medium disabled:opacity-50"
      >
        Kirim Token
      </button>
    </div>
  )
}
