// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract TrustTrace is AccessControl {
    IERC20 public trustUSD;
    mapping(uint256 => address[]) public allowedRecipients;
    mapping(uint256 => uint256) public allowedAmounts;
    uint256[] public segmentLength;
    uint256 public totalDonations;
    uint256 public maxTotalDonations;
    bytes32 public constant REGULATOR_ROLE = keccak256("REGULATOR_ROLE");

    constructor(
        address _trustUSD,
        uint256 _maxTotalDonations,
        address regulator,
        uint256[] memory allowancePercentage
    ) {
        require(
            sumOfArray(allowancePercentage) == 100,
            "TrustTrace: Allowances do not add up to 100"
        );
        _grantRole(REGULATOR_ROLE, regulator);
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        trustUSD = IERC20(_trustUSD);
        maxTotalDonations = _maxTotalDonations;
        for (uint256 i = 0; i < allowancePercentage.length; i++) {
            allowedAmounts[i] =
                (maxTotalDonations * allowancePercentage[i]) /
                100;
            segmentLength.push(0);
        }
    }

    function sumOfArray(
        uint256[] memory array
    ) internal pure returns (uint256) {
        uint256 sum = 0;
        for (uint256 i = 0; i < array.length; i++) {
            sum += array[i];
        }
        return sum;
    }

    function distributeFunds(
        uint256 segment,
        uint256 key,
        uint256 amount
    ) external onlyRole(DEFAULT_ADMIN_ROLE) {
        require(
            allowedRecipients[segment].length > 0,
            "No recipients in this group"
        );
        require(amount > 0, "Amount should be greater than 0");
        require(
            trustUSD.balanceOf(address(this)) >= amount,
            "Contract balance is insufficient"
        );
        require(
            allowedAmounts[segment] >= amount,
            "Exceeds maximum distribution"
        );
        require(
            trustUSD.transfer(allowedRecipients[segment][key], amount),
            "TrustTrace: Transfer failed"
        );
        allowedAmounts[segment] -= amount;
    }

    function donate(uint256 amount) external {
        require(
            totalDonations + amount <= maxTotalDonations,
            "Exceeds maximum donations"
        );
        require(
            trustUSD.transferFrom(msg.sender, address(this), amount),
            "Transfer failed"
        );
        totalDonations += amount;
    }

    function addAllowedRecipient(
        uint256 segment,
        address newRecipient
    ) external onlyRole(REGULATOR_ROLE) {
        allowedRecipients[segment].push(newRecipient);
        segmentLength[segment] += 1;
    }
}
