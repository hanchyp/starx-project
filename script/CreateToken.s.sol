// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/StarxTokenFactory.sol";

contract CreateToken is Script {
    function run() external {
        vm.startBroadcast();

        StarxTokenFactory factory = StarxTokenFactory(0x5FbDB2315678afecb367f032d93F642f64180aa3); // <--- ganti alamat factory yang sudah dideploy

        factory.createStarxToken(
            "ArtistToken",
            "ART",
            1_000_000 ether,
            0.01 ether
        );

        vm.stopBroadcast();
    }
}
