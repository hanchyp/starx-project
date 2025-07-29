import { useSendTransaction } from "thirdweb/react"
import { tokenABI } from "@/abi/token"
import { client } from "@/app/client"

export function useBuyToken(tokenAddress: string) {
  const tx = useSendTransaction({
    client,
    contract: {
      abi: tokenABI,
      address: tokenAddress,
    },
    method: "buyToken",
  })

  return tx
}
