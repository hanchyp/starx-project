// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/StarxToken.sol";
import "../src/StarxTokenFactory.sol";

contract StarxTokenTest is Test {
    StarxToken token;
    StarxTokenFactory factory;

    address owner = address(0xABCD);
    address user = address(0x1234);

    uint256 cap = 1_000_000;
    uint256 pricePerToken = 1e15; // 0.001 ETH
    uint256 minPurchase = 100;
    uint256 minHold = 200;
    uint256 holdDuration = 1 days;

    string purchaseURI = "ipfs://purchase";
    string holdURI = "ipfs://hold";

    function setUp() public {
        vm.startPrank(owner);
        factory = new StarxTokenFactory();

        factory.createStarxToken(
            "Starx", 
            "STRX", 
            cap, 
            pricePerToken,
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafybeiapbutbxfirki6qqydm7n3ynznoy7xjl4y5imzpuu5qqgjqm6si6i"
        );

        address created = factory.getAllTokens()[0];
        token = StarxToken(payable(created));

        token.setRewardConditions(
            minPurchase,
            minHold,
            holdDuration,
            purchaseURI,
            holdURI
        );
        vm.stopPrank();
    }

    function testSetRewardConditions() public {
        vm.prank(owner);

        uint256 newMinPurchase = 200;
        uint256 newMinHold = 300;
        uint256 newMinDuration = 7 days;
        string memory newPurchaseURI = "ipfs://purchase-reward";
        string memory newHoldURI = "ipfs://hold-reward";

        token.setRewardConditions(
            newMinPurchase,
            newMinHold,
            newMinDuration,
            newPurchaseURI,
            newHoldURI
        );

        uint256 decimals = token.decimals();

        assertEq(token.minPurchaseForReward(), newMinPurchase * 10 ** decimals);
        assertEq(token.minHoldAmount(), newMinHold * 10 ** decimals);
        assertEq(token.minHoldDuration(), newMinDuration);
        assertEq(token.purchaseRewardURI(), newPurchaseURI);
        assertEq(token.holdRewardURI(), newHoldURI);
    }


    function testOnlyOwnerCanSetRewardConditions() public {
        vm.prank(user);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user));

        token.setRewardConditions(
            100,
            100,
            1 days,
            "ipfs://fail1",
            "ipfs://fail2"
        );
    }

    function testOwnerIsSetCorrectly() public view {
        assertEq(token.owner(), owner);
    }

    function testBuyTokenAndReceivePurchaseReward() public {
        uint256 valueToSend = minPurchase * pricePerToken;
        vm.deal(user, 1 ether);
        vm.prank(user);

        vm.expectEmit(true, false, false, true);
        emit StarxToken.PurchaseRewardGranted(user, purchaseURI);

        token.buyToken{value: valueToSend}();

        uint256 expectedBalance = minPurchase * (10 ** token.decimals());
        assertEq(token.balanceOf(user), expectedBalance);
        assertTrue(token.claimedPurchaseReward(user));
    }

    function testCannotClaimHoldRewardTooSoon() public {
        uint256 amount = minHold * pricePerToken;
        vm.deal(user, 1 ether);
        vm.prank(user);
        token.buyToken{value: amount}();

        vm.prank(user);
        vm.expectRevert("Hold duration not met");
        token.claimHoldReward();
    }

    function testClaimHoldRewardAfterDuration() public {
        uint256 amount = minHold * pricePerToken;
        vm.deal(user, 1 ether);
        vm.prank(user);
        token.buyToken{value: amount}();

        vm.warp(block.timestamp + holdDuration + 1);

        vm.prank(user);
        vm.expectEmit(true, false, false, true);
        emit StarxToken.HoldRewardGranted(user, holdURI);

        token.claimHoldReward();

        assertTrue(token.claimedHoldReward(user));
    }

    function testWithdrawByOwner() public {
        uint256 amount = minHold * pricePerToken;
        vm.deal(user, 1 ether);
        vm.prank(user);
        token.buyToken{value: amount}();

        uint256 before = owner.balance;

        vm.prank(owner);
        token.withdraw();

        assertGt(owner.balance, before);
    }

    function testCannotBuyWithoutETH() public {
        vm.prank(user);
        vm.expectRevert("Send ETH to buy tokens");
        token.buyToken{value: 0}();
    }

    function testNonOwnerCannotWithdraw() public {
        uint256 amount = minHold * pricePerToken;
        vm.deal(user, 1 ether);
        vm.prank(user);
        token.buyToken{value: amount}();

        vm.prank(user);
        vm.expectRevert(abi.encodeWithSelector(Ownable.OwnableUnauthorizedAccount.selector, user));
        token.withdraw();
    }

    function testCannotClaimPurchaseRewardTwice() public {
        uint256 valueToSend = minPurchase * pricePerToken;

        vm.deal(user, 2 ether);
        vm.prank(user);
        token.buyToken{value: valueToSend}();

        assertTrue(token.claimedPurchaseReward(user));

        vm.prank(user);
        token.buyToken{value: valueToSend}(); // Tidak emit ulang

        assertTrue(token.claimedPurchaseReward(user)); // Masih true, tidak berubah
    }
}
