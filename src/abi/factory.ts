export const factoryABI = [
  {
    "inputs": [],
    "name": "getAllTokens",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "symbol",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "cap",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "tokenPriceInWei",
        "type": "uint256"
      }
    ],
    "name": "createStarxToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "allTokens",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "artist",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "address",
        "name": "tokenAddress",
        "type": "address"
      }
    ],
    "name": "StarxTokenCreated",
    "type": "event"
  },
  {
  "inputs": [
    { "internalType": "address", "name": "", "type": "address" }
  ],
  "name": "isArtist",
  "outputs": [
    { "internalType": "bool", "name": "", "type": "bool" }
  ],
  "stateMutability": "view",
  "type": "function"
}

]
