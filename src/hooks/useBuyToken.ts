import { useSendTransaction } from "thirdweb/react";
import { getContract, prepareContractCall } from "thirdweb";
import { tokenABI } from "@/abi/token";
import { chain, client } from "@/app/client";

export function useBuyToken(tokenAddress: string) {
  const { mutate: sendTx, isPending, data, error } = useSendTransaction();

  const buy = () => {
    const contract = getContract({
      address: tokenAddress,
      abi: tokenABI,
      chain,
      client,
    });

    const tx = prepareContractCall({
      contract,
      method: "buyToken",
      params: [],
    });

    sendTx(tx);
  };

  return {
    buy,
    isPending,
    data,
    error,
  };
}
