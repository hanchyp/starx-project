import { useQuery } from "@tanstack/react-query"
import { readContract } from "thirdweb"
import { factoryABI } from "@/abi/factory"
import { FACTORY_ADDRESS } from "@/constants"
import { client, chain } from "@/app/client"

export function useMyTokens(userAddress?: string) {
  return useQuery({
    queryKey: ["my-tokens", userAddress],
    enabled: !!userAddress,
    queryFn: async () => {
      const tokens = await readContract({
        client,
        chain,
        address: FACTORY_ADDRESS,
        abi: factoryABI,
        functionName: "getTokensByOwner",
        args: [userAddress],
      })

      return tokens as string[]
    },
  })
}
