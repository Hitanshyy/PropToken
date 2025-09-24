const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("PropertyDeed Contract", function () {
  let PropertyDeed, propertyDeed, owner, addr1;

  beforeEach(async function () {
    [owner, addr1] = await ethers.getSigners();
    PropertyDeed = await ethers.getContractFactory("PropertyDeed");
    propertyDeed = await PropertyDeed.deploy();
    await propertyDeed.deployed();
  });

  it("Should mint a new property NFT", async function () {
    const tx = await propertyDeed.mintProperty(owner.address, "https://example.com/token/1");
    await tx.wait();

    expect(await propertyDeed.getPropertyURI(1)).to.equal("https://example.com/token/1");
  });
});
