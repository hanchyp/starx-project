import { useEffect, useState } from "react"
import { getContract, readContract } from "thirdweb"
import { factoryABI } from "@/abi/factory"
import { tokenABI } from "@/abi/token"
import { client, chain } from "@/app/client"
import { FACTORY_ADDRESS } from "@/constants"

type TokenInfo = {
  address: string
  balance: string
  name: string
  symbol: string
}

export function useUserTokens(userAddress: string) {
  const [tokens, setTokens] = useState<TokenInfo[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!userAddress) return

    async function fetchTokens() {
      setLoading(true)

      try {
        const factory = getContract({
          address: FACTORY_ADDRESS,
          abi: factoryABI,
          client,
          chain,
        })

        const allTokenAddresses: string[] = await readContract({
          contract: factory,
          method: "getAllTokens",
          params: [],
        })

        const results: TokenInfo[] = []

        for (const tokenAddr of allTokenAddresses) {
          const token = getContract({
            address: tokenAddr,
            abi: tokenABI,
            client,
            chain,
          })

          const [balance, name, symbol] = await Promise.all([
            readContract({ contract: token, method: "balanceOf", params: [userAddress] }),
            readContract({ contract: token, method: "name" }),
            readContract({ contract: token, method: "symbol" }),
          ])

          if (BigInt(balance) > 0n) {
            results.push({
              address: tokenAddr,
              balance: balance.toString(),
              name: name as string,
              symbol: symbol as string,
            })
          }
        }

        setTokens(results)
      } catch (err) {
        console.error("Error fetching held tokens:", err)
      }

      setLoading(false)
    }

    fetchTokens()
  }, [userAddress])

  return { tokens, loading }
}
