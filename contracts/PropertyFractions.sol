// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PropertyFractions is ERC20, Ownable {
    uint256 public propertyId;

    constructor(
        string memory name_,
        string memory symbol_,
        uint256 totalSupply_,
        address owner_,
        uint256 _propertyId
    ) ERC20(name_, symbol_) {
        _mint(owner_, totalSupply_);
        propertyId = _propertyId;
        transferOwnership(owner_);
    }
}

