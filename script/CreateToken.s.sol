// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Script.sol";
import "../src/StarxTokenFactory.sol";

contract CreateToken is Script {
    function run() external {
        address FACTORY_ADDRESS  =  0x9De401926d3c4e7c7db52d5Ddd04ae792C25863D;
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
            "Taylor Swift Token",
            "TYLR",
            1000000,
            0.001 ether,
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafybeienvhrbyw6pslpggdluf5xgfieiyynqk5rurh5bewcwrt5bd7auvi",
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafkreicb5lqhfw7a35z3gcgkcjr74c46tb7sw3ox5grqdximtsfgfren2i"
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
            "Rich Brian Token",
            "RCBR",
            3000000,
            0.0015 ether,
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafybeidl6mtxvcivgxpq3m2zzkwj77xv7bzamvk25tcilcznjkwzghhltu",
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafkreiac4fwu2vaqag7z6gzwj6virtmymrujlh6zlgjmsihjtuq7mvmtyu"
        );

        factory.createStarxToken(
            "NIKI Token",
            "NIKI",
            5000000,
            0.0005 ether,
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafybeiaesjgwjyrncaewm7owfbev6khauhad2bcygnzatjhk5eg3gixleu",
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafkreiau6jmeoaj7i7lrxbtndgbaqwxf65hdfqfww2t4nsb2kmtb3aqjfm"
        );

        factory.createStarxToken(
            "JKT48 Token",
            "JKT",
            100000,
            0.0001 ether,
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafybeic4nchlvqhf36enb2vumbfpu7ixym46mt27obdwh2466vlq6aa4ru",
            "https://silver-permanent-goldfish-229.mypinata.cloud/ipfs/bafkreidmlch7ghjbnp2imfzz3l7qq3jyurkow5sk6qx2khll2xwymh3n3e"
        );

        vm.stopBroadcast();
    }
}
