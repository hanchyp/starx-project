// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/StarxTokenFactory.sol";

contract CreateToken is Script {
    function run() external {
        address FACTORY_ADDRESS  = 0x5FbDB2315678afecb367f032d93F642f64180aa3;
        vm.startBroadcast();

        StarxTokenFactory factory = StarxTokenFactory(FACTORY_ADDRESS);

        factory.createStarxToken(
            "NEWJEANS Token",
            "NJNS",
            1000000,
            0.0001 ether,
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafybeia2idbiuhec3okvijzzldo3agdtuno3tog5ugsb5tycb2boyteicq",
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafkreiemipf5ft4o6kszuym7vd7cq4smsa2rxlbhdw2w2nqgroond65h4i"
        );

        factory.createStarxToken(
            "Travis Scott Token",
            "TRVS",
            500000,
            0.001 ether,
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafybeid4am7bu4icg7dgjemi527bdxshnwj37sl6va442xdyzbcdvot2oa",
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafkreia5wvqxbonmkagrlsc3dpqys5yyqf6xuwmagdzarpn33y5gpnlzjm"
        );

        factory.createStarxToken(
            "Taylor Swift Token",
            "TYLR",
            1000000,
            0.001 ether,
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafybeienvhrbyw6pslpggdluf5xgfieiyynqk5rurh5bewcwrt5bd7auvi",
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafkreicb5lqhfw7a35z3gcgkcjr74c46tb7sw3ox5grqdximtsfgfren2i"
        );

        vm.stopBroadcast();
    }
}
