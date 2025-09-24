// scripts/tokenizeProperty.js
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Using deployer:", deployer.address);

  
  const tokenizationManagerAddress = "0xe9084F78cBfF01a9aA8F6Cd34f35e5d71EBD66f4";

  // Attach to TokenizationManager
  const TokenizationManager = await hre.ethers.getContractFactory("TokenizationManager");
  const manager = TokenizationManager.attach(tokenizationManagerAddress);
  console.log("Using TokenizationManager at:", manager.address);

  // Tokenize a property
  const tx = await manager.connect(deployer).tokenizeProperty(
    "https://example.com/property/1.json", // tokenURI
    "PropertyFraction",                     // fraction name
    "PFRAC",                                // fraction symbol
    1000000                                 // total fractions
  );

  console.log("Transaction sent:", tx.hash);

  const receipt = await tx.wait();
  console.log("Transaction mined in block:", receipt.blockNumber);

  
  const tokenId = 1;

  // Fetch the fractional token contract address
  const propertyInfo = await manager.properties(tokenId);
  console.log("Fractional token contract address:", propertyInfo.fractionContract);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });

  
