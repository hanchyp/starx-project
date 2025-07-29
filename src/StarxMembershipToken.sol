// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtistMembershipToken is ERC20, Ownable {
    struct MembershipTier {
        string tierName;
        uint256 requiredTokens;
        uint256 minHoldDuration;
        string[] benefits;
        bool isActive;
    }

    MembershipTier[] public membershipTiers;
    mapping(address => uint256) public lastReceived;

    uint256 public tokenPrice;
    uint256 public immutable maxSupply;

    event TokensPurchased(address buyer, uint256 amount, uint256 cost);
    event PriceUpdated(uint256 oldPrice, uint256 newPrice);

    constructor(
        string memory _name,
        string memory _symbol,
        uint256 _initialSupply,
        uint256 _tokenPrice,
        address _owner
    ) ERC20(_name, _symbol) {
        uint256 supplyWithDecimals = _initialSupply * 10 ** decimals();
        _mint(_owner, supplyWithDecimals);
        _transferOwnership(_owner);
        tokenPrice = _tokenPrice;
        maxSupply = supplyWithDecimals;
    }

    // ============ Token Purchase =============

    function buyTokens(uint256 amount) external payable {
        require(amount > 0, "Amount must be greater than 0");

        uint256 cost = amount * tokenPrice;
        require(msg.value >= cost, "Insufficient payment");

        uint256 tokenAmount = amount * 10 ** decimals();
        require(balanceOf(owner()) >= tokenAmount, "Not enough tokens available");

        _transfer(owner(), msg.sender, tokenAmount);

        lastReceived[msg.sender] = block.timestamp;

        if (msg.value > cost) {
            payable(msg.sender).transfer(msg.value - cost);
        }

        emit TokensPurchased(msg.sender, amount, cost);
    }

    function setTokenPrice(uint256 _newPrice) external onlyOwner {
        uint256 oldPrice = tokenPrice;
        tokenPrice = _newPrice;
        emit PriceUpdated(oldPrice, _newPrice);
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    // ============ Fixed Transfer Logic =============

    function transfer(address to, uint256 amount) public override returns (bool) {
        bool success = super.transfer(to, amount);
        if (success && to != address(0)) {
            _updateLastReceived(to);
        }
        return success;
    }

    function transferFrom(address from, address to, uint256 amount) public override returns (bool) {
        bool success = super.transferFrom(from, to, amount);
        if (success && to != address(0)) {
            _updateLastReceived(to);
        }
        return success;
    }

    function _updateLastReceived(address to) internal {
        if (balanceOf(to) > 0) {
            lastReceived[to] = block.timestamp;
        }
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
        require(lastReceived[user] > 0, "User never received tokens");

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

    // ============ Helper Functions =============

    function getUserMembershipStatus(address user) public view returns (
        uint256 balance,
        uint256 holdDuration,
        uint256[] memory eligibleTiers
    ) {
        balance = balanceOf(user);
        holdDuration = lastReceived[user] > 0 ? block.timestamp - lastReceived[user] : 0;
        eligibleTiers = lastReceived ;
    }

    function getTokenCost(uint256 amount) public view returns (uint256) {
        return amount * tokenPrice;
    }
}