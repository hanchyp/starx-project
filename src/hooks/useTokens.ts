import { useEffect, useState } from "react";
import { readContract, getContract } from "thirdweb";
import { localhost } from "thirdweb/chains";
import { chain, client } from "@/app/client";
import { factoryABI } from "@/abi/factory";
import { tokenABI } from "@/abi/token";
import { FACTORY_ADDRESS } from "@/constants";
import { formatEther } from "viem";

export interface TokenInfo {
  address: string;
  name: string;
  symbol: string;
  price: string;
  imageURI: string;
  descURI: string;
}

export function useTokens() {
  const [tokenDetails, setTokenDetails] = useState<TokenInfo[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTokenDetail(address: string): Promise<TokenInfo | null> {
      try {
        const tokenContract = getContract({
          client,
          chain,
          address,
          abi: tokenABI,
        });

        const [name, symbol, priceRaw, tokenImageURI, descriptionURI] = await Promise.all([
          readContract({ contract: tokenContract, method: "name" }),
          readContract({ contract: tokenContract, method: "symbol" }),
          readContract({ contract: tokenContract, method: "pricePerToken" }),
          readContract({ contract: tokenContract, method: "tokenImageURI" }),
          readContract({ contract: tokenContract, method: "descriptionURI" }),
        ]);

        return {
          address,
          name: name as string,
          symbol: symbol as string,
          price: formatEther(priceRaw as bigint),
          imageURI: tokenImageURI as string,
          descURI: descriptionURI as string,
        };
      } catch {
        return null;
      }
    }

    async function fetchTokens() {
      setIsLoading(true);
      setError(null);

      try {
        const factoryContract = getContract({
          client,
          chain,
          address: FACTORY_ADDRESS,
          abi: factoryABI,
        });

        let tokenAddresses: string[] = [];

        try {
          const result = await readContract({
            contract: factoryContract,
            method: "getAllTokens",
          });

          if (Array.isArray(result)) {
            tokenAddresses = result;
          } else {
            throw new Error("Invalid result from getAllTokens");
          }
        } catch {
          const fallback = await readContract({
            contract: {
              address: FACTORY_ADDRESS,
              abi: factoryABI,
              chain,
            },
            method: "function getAllTokens() view returns (address[])",
          });

          if (Array.isArray(fallback)) {
            tokenAddresses = fallback;
          } else {
            throw new Error("Fallback getAllTokens failed");
          }
        }

        const details = await Promise.all(tokenAddresses.map(fetchTokenDetail));
        const validTokens = details.filter((t): t is TokenInfo => t !== null);
        setTokenDetails(validTokens);

      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Unknown error occurred";
        setError(errorMessage);
        setTokenDetails([]);
      } finally {
        setIsLoading(false);
      }
    }

    fetchTokens();
  }, []);

  return {
    tokens: tokenDetails,
    isLoading,
    error,
  };
}
