import { useEffect, useState } from "react";
import { readContract, getContract } from "thirdweb";
import { useActiveAccount } from "thirdweb/react";
import { factoryABI } from "@/abi/factory";
import { chain, client } from "@/app/client";

export function useIsArtist(factoryAddress: string) {
  const account = useActiveAccount();
  const [isArtist, setIsArtist] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStatus() {
      if (!account) return;

      setLoading(true);
      try {
        const contract = getContract({
          address: factoryAddress,
          abi: factoryABI,
          client,
          chain,
        });

        const result = await readContract({
          contract,
          method: "isArtist",
          params: [account.address],
        });

        setIsArtist(Boolean(result));
      } catch (error) {
        console.error("Failed to fetch isArtist:", error);
        setIsArtist(false);
      } finally {
        setLoading(false);
      }
    }

    fetchStatus();
  }, [account, factoryAddress]);

  return { isArtist, loading };
}
