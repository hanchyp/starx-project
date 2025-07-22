// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StarxMembershipToken.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtistTokenFactory is Ownable {
    mapping(address => bool) public approvedArtists;
    mapping(address => address) public artistToToken;

    event ArtistApproved(address artist);
    event TokenCreated(address artist, address tokenAddress);

    function approveArtist(address artist) external onlyOwner {
        approvedArtists[artist] = true;
        emit ArtistApproved(artist);
    }

    function createToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply
    ) external {
        require(approvedArtists[msg.sender], "Not approved as artist");
        require(artistToToken[msg.sender] == address(0), "Already created");

        ArtistMembershipToken token = new ArtistMembershipToken(
            name,
            symbol,
            initialSupply,
            msg.sender
        );

        artistToToken[msg.sender] = address(token);
        emit TokenCreated(msg.sender, address(token));
    }

    function getMyToken() public view returns (address) {
        return artistToToken[msg.sender];
    }
}
