# 🌟 STARX Tokenize Platform

A decentralized platform to empower music artists and their fans through token-based memberships and rewards. Built using modern Web3 and Web2 technologies.

## 🧰 Tech Stack

- **Frontend:** [React](https://reactjs.org/) + [Next.js](https://nextjs.org/)
- **Smart Contract:** [Solidity](https://soliditylang.org/) + [Foundry](https://book.getfoundry.sh/)
- **Design System:** [Tailwind CSS](https://tailwindcss.com/)
- **Storage:** [Pinata (IPFS)](https://www.pinata.cloud/)
- **Blockchain Integration:** [Thirdweb](https://thirdweb.com/) + [Lisk](https://lisk.com/)
- **Version Control:** Git + [GitHub](https://github.com/)

---

## 🚀 Features

### 🎤 Artist Token System
- Deploy ERC20 artist tokens using a smart contract factory.
- Each artist has their own token, description, and artwork (stored on IPFS).
- Tokens are capped in supply and can be bought or sold using ETH.

### 🎁 Reward Mechanism
- **Purchase Reward:** Automatically granted when buying tokens above a minimum threshold.
- **Hold Reward:** Granted after holding a minimum amount for a specified duration (with a live countdown in the UI).

### 📦 Token Metadata
- Metadata stored on IPFS via Pinata:
  - `imageURI` for artist photo.
  - `descriptionURI` for bio and token info.
  - `purchaseRewardURI` and `holdRewardURI` for dynamic rewards.

### 🖼️ Frontend Features
- Artist discovery carousel.
- Token buying interface with real-time balance display.
- Countdown for hold reward eligibility.
- Responsive UI powered by Tailwind.

---

## 📁 Project Structure

```

├── src/                # Solidity contracts (StarxToken, Factory) & Apps
│   ├── app/                  # Next.js routes and components
│   ├── components/ui/        # UI components (Tailwind + shadcn)
│   ├── hooks/                # Custom React hooks (useTokens, etc)
│   └── abi/                  # Contract ABIs
├── script/             # Deployment and IPFS upload scripts
├── foundry.toml        # Foundry config
├── README.md

````

---

## 🛠️ Getting Started

### Prerequisites

- Node.js `>=18`
- Foundry: `curl -L https://foundry.paradigm.xyz | bash`
- Metamask or other EVM wallet
- Pinata account (for uploading metadata)

### 1. Install dependencies

```bash
npm install
````

### 2. Run the frontend locally

```bash
npm run dev
```

### 3. Deploy smart contracts

```bash
forge build
forge script script/DeployFactory.s.sol --rpc-url <your_rpc_url> --private-key <your_private_key> --broadcast
forge script script/CreateToken.s.sol --rpc-url <your_rpc_url> --private-key <your_private_key> --broadcast
```

---

## 🧪 Smart Contract Overview

### `StarxTokenFactory.sol`

* Deploy new artist tokens on demand
* Keeps a list of all deployed tokens
* Verifies if an address is an artist

### `StarxToken.sol`

* ERC20 with cap, price, and reward logic
* Purchase/hold reward system with URI metadata
* Allows withdrawal of ETH by owner

---

## 📦 IPFS via Pinata

You can upload token metadata and images to IPFS using Pinata. Sample metadata format:

```json
{
  "name": "Free Exclusive Merchandise",
  "description": "Merchandise for Token Buyers",
  "image": "CID"
}
```

---

## 🛡️ Security Notes

* Contracts are Ownable.
* Rewards are only claimable once per user.
* Tokens are capped and non-mintable after deployment.

---

## 🧠 Future Improvements

* NFT-based tiered memberships
* Analytics dashboard for artists
* DAO governance for fan participation
* Cross-chain support

---

## 🤝 Contributing

Pull requests and ideas are welcome! Please fork the repo and create a feature branch.

---

## 📄 License

[MIT License](./LICENSE)

---

## Contract Address
StarxFactoryToken: 0x9De401926d3c4e7c7db52d5Ddd04ae792C25863D

## 📬 Contact

For questions or collaboration:

* GitHub Issues
* Email: [farhancahyapermana@gmail.com](mailto:farhancahyapermana@gmail.com)
