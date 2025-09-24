// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PropertyDeed is ERC721URIStorage, Ownable {
    uint256 private _tokenIds; // Counter for token IDs

    constructor() ERC721("PropertyDeed", "PROP") {}

    // Mint a new Property NFT; only owner can call
    function mintProperty(address to, string memory tokenURI_) external onlyOwner returns (uint256) {
        _tokenIds += 1;
        uint256 newTokenId = _tokenIds;

        _mint(to, newTokenId);
        _setTokenURI(newTokenId, tokenURI_);

        return newTokenId;
    }

    // Get the tokenURI of a property
    function getPropertyURI(uint256 tokenId) public view returns (string memory) {
        require(_exists(tokenId), "Property does not exist");
        return tokenURI(tokenId);
    }
}

