// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/StarxTokenFactory.sol";

contract DeployFactory is Script {
    function run() external {
        vm.startBroadcast();
        StarxTokenFactory factory = new StarxTokenFactory();
        console.log("Factory deployed at:", address(factory));
        vm.stopBroadcast();
    }
}
