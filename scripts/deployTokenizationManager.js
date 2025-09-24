// scripts/deployTokenizationManager.js
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const propertyDeedAddress = "0x30A1174EB8c521C63594A77a56D7D7eda370dD98"; // deployed PropertyDeed

  const TokenizationManager = await hre.ethers.getContractFactory("TokenizationManager");
  const manager = await TokenizationManager.deploy(propertyDeedAddress);
  await manager.deployTransaction.wait(); // Wait for deployment
  console.log("TokenizationManager deployed to:", manager.address);

  //  transfer ownership of PropertyDeed to TokenizationManager 
  const propertyDeed = await hre.ethers.getContractAt("PropertyDeed", propertyDeedAddress);
  const tx = await propertyDeed.transferOwnership(manager.address);
  await tx.wait();
  console.log("Ownership of PropertyDeed transferred to TokenizationManager");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
