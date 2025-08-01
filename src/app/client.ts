import { createThirdwebClient, defineChain, getContract } from "thirdweb";

export const client = createThirdwebClient({
  clientId: `${process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}`,
});

export const chain = defineChain({
  id: 4202,
  name: "Lisk Sepolia",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ["https://rpc.sepolia-api.lisk.com"],
    },
  },
  blockExplorers: {
    default: {
      name: "Lisk Explorer",
      url: "https://sepolia-blockscout.lisk.com",
    },
  },
});

export const createFactoryContract = (chainToUse: any) => {
  return getContract({
    client,
    chain: chainToUse,
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
  });
};

export const createTokenContract = (address: string, chainToUse: any) => {
  return getContract({
    client,
    chain: chainToUse,
    address,
  });
};
