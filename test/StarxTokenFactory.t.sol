// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "forge-std/Test.sol";
import "../src/StarxTokenFactory.sol";
import "../src/StarxToken.sol";

contract StarxTokenFactoryTest is Test {
    StarxTokenFactory public factory;
    address public artist = address(0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266);

    function setUp() public {
        factory = new StarxTokenFactory();
        artist = address(0xA11CE);
    }

    function testCreateStarxToken() public {
        vm.prank(artist);

        emit StarxTokenFactory.StarxTokenCreated(artist, address(0));

        factory.createStarxToken("ArtistToken", "ART", 1000, 0.01 ether);

        address[] memory tokens = factory.getAllTokens();
        assertEq(tokens.length, 1, "Token count should be 1");

        StarxToken created = StarxToken(tokens[0]);
        assertEq(created.name(), "ArtistToken");
        assertEq(created.symbol(), "ART");
        assertEq(created.totalSupply(), 1000 ether);
        assertEq(created.owner(), artist);
    }

    function testMultipleTokenCreation() public {
        vm.startPrank(artist);
        factory.createStarxToken("T1", "T1", 1000, 0.01 ether);
        factory.createStarxToken("T2", "T2", 2000, 0.02 ether);
        factory.createStarxToken("T3", "T3", 3000, 0.03 ether);
        vm.stopPrank();

        address[] memory tokens = factory.getAllTokens();
        assertEq(tokens.length, 3, "Token count should be 3");
    }

    function testIsArtistInitiallyFalse() public view {
        bool isRegistered = factory.isArtist(artist);
        assertFalse(isRegistered, "Should not be artist yet");
    }

    function testIsArtistAfterRegister() public {
        vm.prank(artist);
        factory.createStarxToken(
            "Starx", 
            "STRX", 
            100, 
            1e15
        );

        bool isRegistered = factory.isArtist(artist);
        assertTrue(isRegistered, "Should be artist after register");
    }
}
