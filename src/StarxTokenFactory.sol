// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StarxToken.sol";

contract StarxTokenFactory {
    address[] public allTokens;
    mapping(address => bool) public isArtist;

    event StarxTokenCreated(address indexed artist, address tokenAddress);

    function createStarxToken(
        string memory name,
        string memory symbol,
        uint256 cap,
        uint256 tokenPriceInWei
    ) external {
        StarxToken token = new StarxToken(name, symbol, cap, tokenPriceInWei, msg.sender);
        allTokens.push(address(token));
        isArtist[msg.sender] = true;
        emit StarxTokenCreated(msg.sender, address(token));
    }

    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }
}
