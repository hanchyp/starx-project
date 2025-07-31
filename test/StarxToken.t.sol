// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/StarxToken.sol";

contract StarxTokenTest is Test {
    StarxToken token;
    address owner = address(0xABCD);
    address user = address(0xBEEF);

    uint256 public constant INITIAL_CAP = 1_000_000 ether;
    uint256 public constant TOKEN_PRICE = 1 ether; // 1 ETH per token

    function setUp() public {
        // Berikan ETH ke owner dan user untuk transaksi
        vm.deal(owner, 100 ether);
        vm.deal(user, 100 ether);

        // Deploy contract
        token = new StarxToken(
            "TestToken",
            "TEST",
            1_000_000,
            TOKEN_PRICE,
            owner,
            "ipfs://token-image",
            "ipfs://desc"
        );

        // Owner set reward condition
        vm.prank(owner);
        token.setRewardConditions(
            100, // min purchase
            200, // min hold
            7 days,
            "ipfs://purchase-reward",
            "ipfs://hold-reward"
        );
    }

    function testOwnerBalance() public view {
        // Owner seharusnya punya seluruh token cap awal
        assertEq(token.balanceOf(owner), INITIAL_CAP);
    }

    function testUserCannotClaimRewardWithoutBuy() public {
        vm.prank(user);
        vm.expectRevert(); // belum memenuhi syarat holding
        token.claimHoldReward();
    }

    function testBuyBelowMinNotGetPurchaseReward() public {
        vm.prank(user);
        token.buyToken{value: 10 ether}(); // hanya dapat 10 token

        bool claimed = token.claimedPurchaseReward(user);
        assertFalse(claimed, "User tidak boleh dapat reward jika beli < minPurchaseForReward");
    }

    function testBuyEnoughShouldGetPurchaseReward() public {
        vm.prank(user);
        token.buyToken{value: 100 ether}(); // beli 100 token, sesuai threshold

        bool claimed = token.claimedPurchaseReward(user);
        assertTrue(claimed, "User seharusnya dapat reward jika beli >= minPurchaseForReward");
    }

    function testOwnerBuyAlsoGetsReward() public {
        vm.prank(owner);
        token.buyToken{value: 100 ether}();

        bool claimed = token.claimedPurchaseReward(owner);
        assertTrue(claimed, "Owner seharusnya dapat reward juga jika beli memenuhi syarat");
    }

    function testEventEmittedWhenRewardGranted() public {
        vm.expectEmit(true, false, false, true);
        emit PurchaseRewardGranted(user, "ipfs://purchase-reward");

        vm.prank(user);
        token.buyToken{value: 100 ether}();
    }

    event PurchaseRewardGranted(address indexed user, string uri);
}
