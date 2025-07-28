// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/StarxMembershipToken.sol";

contract ArtistMembershipTokenTest is Test {
    ArtistMembershipToken token;
    address owner = address(0xABCD);
    address user = address(0x1234);

    function setUp() public {
        vm.deal(owner, 100 ether);
        vm.deal(user, 100 ether);

        vm.prank(owner);
        token = new ArtistMembershipToken("ArtistToken", "ART", 100_000, 0.01 ether, owner);
    }

    function testBuyTokens() public {
        vm.prank(user);
        token.buyTokens{value: 0.1 ether}(10);

        assertEq(token.balanceOf(user), 10 * 1e18);
    }

    function testSetTokenPrice() public {
        vm.prank(owner);
        token.setTokenPrice(0.02 ether);

        assertEq(token.tokenPrice(), 0.02 ether);
    }

    function testAddMembershipTierAndEligibility() public {
        string ;
        benefits[0] = "Exclusive content";

        vm.prank(owner);
        token.addMembershipTier("Gold", 10, 0, benefits);

        vm.prank(user);
        token.buyTokens{value: 0.2 ether}(20);

        uint256[] memory tiers = token.getEligibleTiers(user);
        assertEq(tiers.length, 1);
    }

    function testWithdraw() public {
        vm.prank(user);
        token.buyTokens{value: 0.1 ether}(10);

        uint256 before = owner.balance;
        vm.prank(owner);
        token.withdraw();
        uint256 afterBal = owner.balance;

        assertGt(afterBal, before);
    }
}
