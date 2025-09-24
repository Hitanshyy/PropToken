const hre = require("hardhat");

async function main() {
    const tokenizationManagerAddress = "0xe9084F78cBfF01a9aA8F6Cd34f35e5d71EBD66f4";
    const TokenizationManager = await hre.ethers.getContractAt(
        "TokenizationManager",
        tokenizationManagerAddress
    );

    const propertyId = 1; 
    const pricePerFraction = hre.ethers.utils.parseEther("0.001"); 

    const tx = await TokenizationManager.startDistribution(propertyId, pricePerFraction);
    await tx.wait();
    console.log("Property fractions opened for sale at:", pricePerFraction.toString());
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
