// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "./Token.sol";
import "./Exchange.sol";


contract Factory {
    Token token;
    Exchange exchange;
    Token[] public list_tokens;
    Exchange[] public token_exchanges;

    function createToken(string memory _name, string memory _symbol, uint256 _total) external {
        token = new Token(_name , _symbol , _total);
        list_tokens.push(token);
     }

    function createExchange(address _token) external {
        exchange = new Exchange(_token);
        token_exchanges.push(exchange);
     }
}