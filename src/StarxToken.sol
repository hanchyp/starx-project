// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "openzeppelin-contracts/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "openzeppelin-contracts/contracts/access/Ownable.sol";

contract StarxToken is ERC20Capped, Ownable {
    uint256 public pricePerToken;
    uint256 public minPurchaseForReward;
    uint256 public minHoldAmount;
    uint256 public minHoldDuration;

    string public purchaseRewardURI;
    string public holdRewardURI;

    mapping(address => uint256) public holdingStart;
    mapping(address => bool) public claimedHoldReward;
    mapping(address => bool) public claimedPurchaseReward;

    event PurchaseRewardGranted(address indexed user, string uri);
    event HoldRewardGranted(address indexed user, string uri);

    constructor(
        string memory name,
        string memory symbol,
        uint256 cap,
        uint256 _pricePerToken,
        address _initialOwner
    ) ERC20(name, symbol)
    ERC20Capped(cap * 10 ** decimals())
    Ownable(_initialOwner)
    {
        _mint(_initialOwner, cap * 10 ** decimals());
        pricePerToken = _pricePerToken;
    }


    function setRewardConditions(
        uint256 _minPurchase,
        uint256 _minHoldAmount,
        uint256 _minHoldDuration,
        string memory _purchaseURI,
        string memory _holdURI
    ) external onlyOwner {
        minPurchaseForReward = _minPurchase * 10 ** decimals();
        minHoldAmount = _minHoldAmount * 10 ** decimals();
        minHoldDuration = _minHoldDuration;
        purchaseRewardURI = _purchaseURI;
        holdRewardURI = _holdURI;
    }
    
    function buyToken() external payable {
        require(msg.value > 0, "Send ETH to buy tokens");

        uint256 amount = (msg.value * 10 ** decimals()) / pricePerToken;
        require(amount > 0, "Insufficient ETH for token purchase");
        require(balanceOf(owner()) >= amount, "Not enough tokens in contract");

        _transfer(owner(), msg.sender, amount);

        if (amount >= minPurchaseForReward && !claimedPurchaseReward[msg.sender]) {
            claimedPurchaseReward[msg.sender] = true;
            emit PurchaseRewardGranted(msg.sender, purchaseRewardURI);
        }

        if (holdingStart[msg.sender] == 0) {
            holdingStart[msg.sender] = block.timestamp;
        }
    }


    function claimHoldReward() external {
        require(!claimedHoldReward[msg.sender], "Already claimed");
        require(balanceOf(msg.sender) >= minHoldAmount, "Insufficient balance");
        require(block.timestamp >= holdingStart[msg.sender] + minHoldDuration, "Hold duration not met");

        claimedHoldReward[msg.sender] = true;
        emit HoldRewardGranted(msg.sender, holdRewardURI);
    }

    function withdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
}
