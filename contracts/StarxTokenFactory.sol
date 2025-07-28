// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

<<<<<<< Updated upstream:contracts/StarxTokenFactory.sol
import "./StarxMembershipToken";
import "@openzeppelin/contracts/access/Ownable.sol";
=======
import "./StarxToken.sol";
>>>>>>> Stashed changes:src/StarxTokenFactory.sol

contract StarxTokenFactory {
    address[] public allTokens;

    event StarxTokenCreated(address indexed artist, address tokenAddress);

    function createStarxToken(
        string memory name,
        string memory symbol,
        uint256 cap,
        uint256 tokenPriceInWei
    ) external {
        StarxToken token = new StarxToken(name, symbol, cap, tokenPriceInWei, msg.sender);
        allTokens.push(address(token));
        emit StarxTokenCreated(msg.sender, address(token));
    }


    function getAllTokens() external view returns (address[] memory) {
        return allTokens;
    }
}
