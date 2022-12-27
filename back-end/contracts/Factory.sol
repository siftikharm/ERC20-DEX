// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "./Token.sol";

contract Factory {
    Token token;
    Token[] public list_tokens;

    function createToken(string memory _name, string memory _symbol, uint256 _total) external {
        token = new Token(_name , _symbol , _total);
        list_tokens.push(token);
    }

}