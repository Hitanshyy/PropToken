const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PropertyFractions Contract", function () {
  let PropertyFractions;
  let fractions;
  let owner;
  let addr1;
  let propertyId = 1; // example property ID

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    PropertyFractions = await ethers.getContractFactory("PropertyFractions");

    // Deploy with correct constructor arguments
    fractions = await PropertyFractions.deploy(
      "Property Fraction", // name
      "PROPFRAC",          // symbol
      1000000,             // totalFractions
      owner.address,       // owner of fractions
      propertyId           // tokenId
    );

    await fractions.deployed();
  });

  it("Should mint all fractional tokens to owner", async function () {
    const balance = await fractions.balanceOf(owner.address);
    expect(balance.toNumber()).to.equal(1000000); // convert BigNumber to number
  });
});
