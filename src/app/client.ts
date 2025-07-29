import { createThirdwebClient, defineChain, getContract } from "thirdweb";
import { localhost } from "thirdweb/chains";

export const client = createThirdwebClient({
  clientId: "45c781fdefb4ce8ef6464b3f59b2b7fe", // Make sure this is set
});

// Try different chain configurations to see which one works:

// Option 1: Use built-in localhost
export const chain1 = localhost;

// Option 2: Define minimal chain
export const chain2 = defineChain(31337);

// Option 3: Define chain with RPC
export const chain3 = defineChain({
  id: 31337,
  rpc: "http://127.0.0.1:8545",
});

// Option 4: More complete chain definition
export const chain4 = defineChain({
  id: 31337,
  name: "Localhost",
  rpc: "http://127.0.0.1:8545",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
});

// Use chain1 (localhost) as default - this should work
export const chain = chain1;

// Alternative approach: Create contract objects separately
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