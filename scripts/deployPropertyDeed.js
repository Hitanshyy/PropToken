// scripts/deployPropertyDeed.js
const hre = require("hardhat");
require("dotenv").config();

async function main() {
  const [deployer] = await hre.ethers.getSigners();
  console.log("Deploying contracts with:", deployer.address);

  const PropertyDeed = await hre.ethers.getContractFactory("PropertyDeed");
  const propertyDeed = await PropertyDeed.deploy(); 
  await propertyDeed.deployTransaction.wait();

  console.log("PropertyDeed deployed to:", propertyDeed.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

