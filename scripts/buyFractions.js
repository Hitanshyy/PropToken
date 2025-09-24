const hre = require("hardhat");

async function main() {
    const [buyer] = await hre.ethers.getSigners();

    const tokenizationManagerAddress = "0xe9084F78cBfF01a9aA8F6Cd34f35e5d71EBD66f4";
    const manager = await hre.ethers.getContractAt("TokenizationManager", tokenizationManagerAddress);

    const propertyId = 1; 
    const numberOfFractions = 1; 

    const propertyInfo = await manager.properties(propertyId);
    const price = propertyInfo.pricePerFraction.mul(numberOfFractions);

    console.log(`Attempting to buy ${numberOfFractions} fractions for ${price} wei...`);

    const tx = await manager.connect(buyer).buyFractions(propertyId, numberOfFractions, { value: price });
    const receipt = await tx.wait();

    console.log(`Fractions purchased in block ${receipt.blockNumber} by ${buyer.address}`);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
