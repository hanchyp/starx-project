import { useSendTransaction } from "thirdweb/react"
import { tokenABI } from "@/abi/token"
import { chain, client } from "@/app/client"

export function useBuyToken(tokenAddress: string) {
  const tx = useSendTransaction({
    client,
    chain,
    contract: {
      abi: tokenABI,
      address: tokenAddress,
    },
    method: "buyToken",
  })

  return tx
}
