// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/StarxTokenFactory.sol";

contract CreateToken is Script {
    function run() external {
        address FACTORY_ADDRESS  = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
        vm.startBroadcast();

        StarxTokenFactory factory = StarxTokenFactory(FACTORY_ADDRESS); // <--- ganti alamat factory yang sudah dideploy

        factory.createStarxToken(
            "Taylor Swift Token",
            "TYLR",
            1_000_000 ether,
            0.05 ether
        );

        vm.stopBroadcast();
    }
}
