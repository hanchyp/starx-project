// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "./StarxMembershipToken";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ArtistTokenFactory is Ownable {
    mapping(address => bool) public approvedArtists;
    mapping(address => address) public artistToToken;
    
    uint256 public defaultTokenPrice = 0.001 ether;
    
    event ArtistApproved(address artist);
    event TokenCreated(address artist, address tokenAddress, uint256 tokenPrice);
    event DefaultPriceUpdated(uint256 oldPrice, uint256 newPrice);

    constructor(uint256 _defaultTokenPrice) {
        defaultTokenPrice = _defaultTokenPrice;
    }

    function approveArtist(address artist) external onlyOwner {
        approvedArtists[artist] = true;
        emit ArtistApproved(artist);
    }

    function createToken(
        string memory name,
        string memory symbol,
        uint256 initialSupply,
        uint256 tokenPrice // Artist can set custom price
    ) external {
        require(approvedArtists[msg.sender], "Not approved as artist");
        require(artistToToken[msg.sender] == address(0), "Already created");
        require(tokenPrice > 0, "Token price must be greater than 0");

        ArtistMembershipToken token = new ArtistMembershipToken(
            name,
            symbol,
            initialSupply,
            tokenPrice,
            msg.sender
        );

        artistToToken[msg.sender] = address(token);
        emit TokenCreated(msg.sender, address(token), tokenPrice);
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
            defaultTokenPrice,
            msg.sender
        );

        artistToToken[msg.sender] = address(token);
        emit TokenCreated(msg.sender, address(token), defaultTokenPrice);
    }

    function setDefaultTokenPrice(uint256 _newPrice) external onlyOwner {
        require(_newPrice > 0, "Price must be greater than 0");
        uint256 oldPrice = defaultTokenPrice;
        defaultTokenPrice = _newPrice;
        emit DefaultPriceUpdated(oldPrice, _newPrice);
    }

    function getMyToken() public view returns (address) {
        return artistToToken[msg.sender];
    }
    
    function getArtistToken(address artist) public view returns (address) {
        return artistToToken[artist];
    }
}