import { createThirdwebClient, defineChain, getContract } from "thirdweb";

export const client = createThirdwebClient({
  clientId: "45c781fdefb4ce8ef6464b3f59b2b7fe", // Make sure this is set
});


export const chain = defineChain({
  id: 31337,
  name: "Localhost",
  rpc: "http://127.0.0.1:8545",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
});

export const createFactoryContract = (chainToUse: any) => {
  return getContract({
    client,
    chain: chainToUse,
    address: "0x5FbDB2315678afecb367f032d93F642f64180aa3"
  });
};

export const createTokenContract = (address: string, chainToUse: any) => {
  return getContract({
    client,
    chain: chainToUse,
    address,
  });
};