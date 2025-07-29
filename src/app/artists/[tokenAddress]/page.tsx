"use client"

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { getContract, readContract } from "thirdweb"
import { tokenABI } from "@/abi/token"
import { formatEther } from "viem"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Loader } from "lucide-react"
import { chain, client } from "@/app/client"
import { useActiveAccount } from "thirdweb/react"
import { BuyTokenSection } from "@/components/buy-token-section"
import { SellTokenSection } from "@/components/sell-token-section"
import { TransferTokenSection } from "@/components/transfer-token-section"
import { ClaimHoldRewardSection } from "@/components/claim-hold-reward-section"

export default function ArtistTokenPage() {
  const { tokenAddress } = useParams<{ tokenAddress: string }>()
  const [data, setData] = useState<any>(null)
  const [balance, setBalance] = useState<bigint | null>(null)
  const [availableSupply, setAvailableSupply] = useState<bigint | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const activeAccount = useActiveAccount()

  useEffect(() => {
    if (!tokenAddress || typeof tokenAddress !== "string") {
      console.warn("Invalid tokenAddress:", tokenAddress)
      return
    }

    const fetchTokenInfo = async () => {
      console.log("Fetching token info for", tokenAddress)
      try {
        const contract = getContract({
          address: tokenAddress,
          abi: tokenABI,
          client,
          chain,
        })

        const name = await readContract({ contract, method: "name" })
        const [symbol, totalSupply, pricePerToken, purchaseRewardURI, holdRewardURI] = await Promise.all([
          readContract({ contract, method: "symbol" }),
          readContract({ contract, method: "totalSupply" }),
          readContract({ contract, method: "pricePerToken" }),
          readContract({ contract, method: "purchaseRewardURI" }),
          readContract({ contract, method: "holdRewardURI" }),
        ])

        setData({
          name,
          symbol,
          totalSupply,
          pricePerToken,
          purchaseRewardURI,
          holdRewardURI,
        })

        // Cek balance user
        if (activeAccount?.address) {
          const userBalance = await readContract({
            contract,
            method: "balanceOf",
            params: [activeAccount.address],
          })
          setBalance(userBalance)
        }

        // Cek available token dari owner
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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20 text-muted-foreground">
        <Loader className="animate-spin mr-2" />Loading token info...
      </div>
    )
  }

  if (error) {
    return <div className="text-red-500 text-center py-20">{error}</div>
  }

  if (!data) {
    return <div className="text-muted-foreground text-center py-20">No data found for this token.</div>
  }

  const handleAddToken = async () => {
    if (window.ethereum) {
      try {
        const wasAdded = await window.ethereum.request({
          method: 'wallet_watchAsset',
          params: {
            type: 'ERC20',
            options: {
              address: tokenAddress,
              symbol: data.symbol,
              decimals: 18,
              image: "/logo.png",
            },
          },
        });

        if (wasAdded) {
          console.log("Token ditambahkan ke wallet!");
        } else {
          console.log("User membatalkan penambahan token.");
        }
      } catch (error) {
        console.error("Gagal menambahkan token:", error);
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-3xl">
            {data.name} (${data.symbol})
          </CardTitle>
          <button
            onClick={handleAddToken}
            className="text-sm px-4 py-2 bg-black text-white rounded hover:bg-gray-900"
          >
            Add to Wallet
          </button>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <p className="text-muted-foreground">Token Address:</p>
            <p className="font-mono break-all">{tokenAddress}</p>
          </div>

          <Separator />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div>
              <p className="text-muted-foreground">Price per Token:</p>
              <p className="font-semibold">{formatEther(data.pricePerToken)} ETH</p>
            </div>
            <div>
              <p className="text-muted-foreground">Total Supply:</p>
              <p className="font-semibold">{Number(formatEther(data.totalSupply)).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Your Balance:</p>
              <p className="font-semibold">
                {balance !== null ? Number(formatEther(balance)).toLocaleString() : "—"}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Available to Buy:</p>
              <p className="font-semibold">
                {availableSupply !== null ? Number(formatEther(availableSupply)).toLocaleString() : "—"}
              </p>
            </div>
          </div>

          <Separator />

          <div>
            <p className="text-muted-foreground font-medium mb-1">Purchase Reward URI:</p>
            <p className="font-mono break-all">{data.purchaseRewardURI}</p>
          </div>
          <div>
            <p className="text-muted-foreground font-medium mb-1">Hold Reward URI:</p>
            <p className="font-mono break-all">{data.holdRewardURI}</p>
          </div>

          {/* <Separator />

          <BuyTokenSection
            tokenAddress={tokenAddress}
            pricePerToken={data.pricePerToken}
          />
          <SellTokenSection tokenAddress={tokenAddress} />
          <TransferTokenSection tokenAddress={tokenAddress} />
          <ClaimHoldRewardSection tokenAddress={tokenAddress} /> */}

        </CardContent>
      </Card>
    </div>
  )
}
