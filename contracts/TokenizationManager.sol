// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./PropertyDeed.sol";
import "./PropertyFractions.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TokenizationManager is Ownable {
    PropertyDeed public propertyDeed;

    struct PropertyInfo {
        PropertyFractions fractionContract;
        uint256 pricePerFraction;
        bool forSale;
    }

    mapping(uint256 => PropertyInfo) public properties;

    // Events
    event PropertyTokenized(uint256 propertyId, address fractionContract);
    event FractionsForSale(uint256 propertyId, uint256 pricePerFraction);
    event FractionsPurchased(uint256 propertyId, address buyer, uint256 numberOfFractions);

    constructor(address propertyDeedAddress) {
        propertyDeed = PropertyDeed(propertyDeedAddress);
    }

    // Tokenize a property: mint NFT, deploy fractions, lock NFT
    function tokenizeProperty(
        string memory tokenURI,
        string memory fractionName,
        string memory fractionSymbol,
        uint256 totalFractions
    ) external onlyOwner {
        // Mint the property NFT to the contract itself
        uint256 newTokenId = propertyDeed.mintProperty(address(this), tokenURI);

        // Mint fractional tokens to the contract so it can sell them
        PropertyFractions fractions = new PropertyFractions(
            fractionName,
            fractionSymbol,
            totalFractions,
            address(this),   // contract holds fractions
            newTokenId
        );

        properties[newTokenId] = PropertyInfo({
            fractionContract: fractions,
            pricePerFraction: 0,
            forSale: false
        });

        emit PropertyTokenized(newTokenId, address(fractions));
    }

    // Set price and open fractions for sale
    function startDistribution(uint256 propertyId, uint256 pricePerFractionInWei) external onlyOwner {
        PropertyInfo storage info = properties[propertyId];
        require(address(info.fractionContract) != address(0), "Property not tokenized");

        info.pricePerFraction = pricePerFractionInWei;
        info.forSale = true;

        emit FractionsForSale(propertyId, pricePerFractionInWei);
    }

    // Buy fractions with ETH
    function buyFractions(uint256 propertyId, uint256 numberOfFractions) external payable {
        PropertyInfo storage info = properties[propertyId];
        require(info.forSale, "Fractions not for sale");
        require(msg.value == numberOfFractions * info.pricePerFraction, "Incorrect ETH sent");

        // Transfer fractional tokens to buyer
        info.fractionContract.transfer(msg.sender, numberOfFractions);

        emit FractionsPurchased(propertyId, msg.sender, numberOfFractions);
    }
}
