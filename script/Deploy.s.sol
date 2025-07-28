// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/StarxMembershipToken.sol";

contract Deploy is Script {
    function run() public {
        vm.startBroadcast();

        ArtistMembershipToken token = new ArtistMembershipToken(
            "ArtistToken",
            "ART",
            1_000_000,   // initial supply
            0.01 ether,  // token price
            msg.sender   // owner
        );

        console.log("Deployed to:", address(token));

        vm.stopBroadcast();
    }
}
