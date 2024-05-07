// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TrustUSD is ERC20, Ownable {
    constructor(
        address initialOwner
    ) ERC20("TrustUSD", "TUSD") Ownable(initialOwner) {
        _mint(msg.sender, 100000000 * 10 ** decimals());
    }

    function redeem(uint256 amount) external {
        _burn(msg.sender, amount);
    }
}
