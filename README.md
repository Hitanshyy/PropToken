# PropToken

**PropToken** is a decentralized property tokenization platform built on Ethereum. It allows property owners to mint NFTs representing their properties and create fractional ownership using ERC20 tokens. Users can buy fractions of properties, enabling shared ownership and easier investment.

---

## Architecture Overview

PropToken consists of three main smart contracts:

1. **PropertyDeed (ERC721)**  
   - Represents a unique property as an NFT.  
   - Only the owner (admin) can mint new property NFTs.  

2. **PropertyFractions (ERC20)**  
   - Represents fractional ownership of a property.  
   - Deployed automatically for each property by the TokenizationManager.  

3. **TokenizationManager**  
   - Handles tokenization of properties and distribution of fractions.  
   - Maintains property info, price per fraction, and sale status.  
   - Allows users to buy fractions by sending ETH.

The flow is as follows:  
- Admin mints a property NFT through `TokenizationManager`.  
- `TokenizationManager` deploys an ERC20 fraction contract linked to that property.  
- Admin sets a price and opens fractions for sale.  
- Users purchase fractions by sending ETH to `TokenizationManager`, which transfers ERC20 tokens to them.

---

## Features

- Mint unique property NFTs.
- Create ERC20 fractional ownership for properties.
- Set price and open fractions for sale.
- Buy fractions using ETH.
- Supports multiple users interacting with the contracts.

---

## Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/PropToken.git
cd PropToken
```
2. Install dependencies:
```bash
npm install
```
3. Configure environment variables:
   Create a .env file in the project root:
```
    PRIVATE_KEY=your_wallet_private_key
    INFURA_API_KEY=your_infura_or_alchemy_key
```
4. Compile Contracts
```bash
npx hardhat compile
```
5. Deployment
   Deploy PropertyDeed:
```bash
npx hardhat run --network sepolia scripts/deployPropertyDeed.js
```
   Deploy TokenizationManager:
``` bash
npx hardhat run --network sepolia scripts/deployTokenizationManager.js
```
   Tokenize a Property:
``` bash
npx hardhat run --network sepolia scripts/tokenizeProperty.js
```
  Start Fraction Distribution:
```bash
npx hardhat run --network sepolia scripts/startDistribution.js
```
  Buy Fractions (as a user):
```bash
npx hardhat run --network sepolia scripts/buyFractions.js
```
6. Testing
   Run tests using Hardhat:
```bash
npx hardhat test
```

Tests cover:
- Minting property NFTs
- Deploying and verifying fractional ERC20 tokens
- Tokenizing properties and transferring fractions

Technology Stack
- Solidity 0.8.20
- Hardhat
- Ethers.js
- OpenZeppelin (ERC721 & ERC20)
- Sepolia Testnet

Future Improvements
- Implement KYC verification for buyers
- Add a web-based front-end
- Integrate real property metadata and off-chain storage (IPFS)
