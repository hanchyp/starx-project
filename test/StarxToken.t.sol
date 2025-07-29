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
    uint256 pricePerToken = 1e15;
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
            pricePerToken
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

    function testOwnerIsSetCorrectly() public view{
        assertEq(token.owner(), owner);
    }

    function testBuyTokenAndReceivePurchaseReward() public {
        vm.deal(user, 1 ether);
        vm.prank(user);

        vm.expectEmit(true, false, false, true);
        emit StarxToken.PurchaseRewardGranted(user, purchaseURI);

        token.buyToken{value: minPurchase * pricePerToken}();

        assertEq(token.balanceOf(user), minPurchase * 10 ** token.decimals());
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

        // Fast forward time
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
        vm.deal(user, 1 ether);
        vm.prank(user);
        token.buyToken{value: minPurchase * pricePerToken}();

        assertTrue(token.claimedPurchaseReward(user));

        vm.prank(user);
        token.buyToken{value: minPurchase * pricePerToken}(); // seharusnya tidak emit event lagi
        // Tidak perlu expectRevert karena hanya tidak emit, tidak revert
        assertTrue(token.claimedPurchaseReward(user));
    }


}
