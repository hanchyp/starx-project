import { useQuery } from "@tanstack/react-query";
import { getContract, readContract } from "thirdweb";
import { factoryABI } from "@/abi/factory";
import { FACTORY_ADDRESS } from "@/constants";
import { client, chain } from "@/app/client";

export function useMyTokens(userAddress?: string) {
  return useQuery({
    queryKey: ["my-tokens", userAddress],
    enabled: !!userAddress,
    queryFn: async () => {
      const contract = getContract({
        address: FACTORY_ADDRESS,
        abi: factoryABI,
        chain,
        client,
      });

      const tokens = await readContract({
        contract,
        method: "getTokensByOwner",
        params: [userAddress!],
      });

      return tokens as string[];
    },
  });
}
