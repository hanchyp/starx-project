// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtistMembershipToken is ERC20, Ownable {
    struct MembershipTier {
        string tierName;
        uint256 requiredTokens;
        uint256 minHoldDuration; // in seconds
        string[] benefits;
        bool isActive;
    }

    MembershipTier[] public membershipTiers;
    mapping(address => uint256) public lastReceived;

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        address _owner
    ) ERC20(_name, _symbol) {
        _mint(_owner, _initialSupply * 10 ** decimals());
        _transferOwnership(_owner);
    }

    function transfer(address to, uint256 amount) public override returns (bool) {
        bool success = super.transfer(to, amount);
        if (success && balanceOf(to) > 0 && lastReceived[to] == 0) {
            lastReceived[to] = block.timestamp;
        }
        return success;
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        bool success = super.transferFrom(from, to, amount);
        if (success && balanceOf(to) > 0 && lastReceived[to] == 0) {
            lastReceived[to] = block.timestamp;
        }
        return success;
    }

    // ============ Tiers =============

    function addMembershipTier(
        string memory tierName,
        uint256 requiredTokens,
        uint256 minHoldDuration,
        string[] memory benefits
    ) public onlyOwner {
        membershipTiers.push(
            MembershipTier({
                tierName: tierName,
                requiredTokens: requiredTokens * 10 ** decimals(),
                minHoldDuration: minHoldDuration,
                benefits: benefits,
                isActive: true
            })
        );
    }

    function updateMembershipTier(
        uint256 index,
        string memory tierName,
        uint256 requiredTokens,
        uint256 minHoldDuration,
        string[] memory benefits,
        bool isActive
    ) public onlyOwner {
        require(index < membershipTiers.length, "Invalid index");
        membershipTiers[index] = MembershipTier({
            tierName: tierName,
            requiredTokens: requiredTokens * 10 ** decimals(),
            minHoldDuration: minHoldDuration,
            benefits: benefits,
            isActive: isActive
        });
    }

    function getEligibleTiers(address user) public view returns (uint256[] memory) {
        uint256 count = 0;

        for (uint256 i = 0; i < membershipTiers.length; i++) {
            if (
                membershipTiers[i].isActive &&
                balanceOf(user) >= membershipTiers[i].requiredTokens &&
                block.timestamp - lastReceived[user] >= membershipTiers[i].minHoldDuration
            ) {
                count++;
            }
        }

        uint256[] memory eligible = new uint256[](count);
        uint256 j = 0;
        for (uint256 i = 0; i < membershipTiers.length; i++) {
            if (
                membershipTiers[i].isActive &&
                balanceOf(user) >= membershipTiers[i].requiredTokens &&
                block.timestamp - lastReceived[user] >= membershipTiers[i].minHoldDuration
            ) {
                eligible[j++] = i;
            }
        }

        return eligible;
    }

    function getTiers() public view returns (MembershipTier[] memory) {
        return membershipTiers;
    }
}
