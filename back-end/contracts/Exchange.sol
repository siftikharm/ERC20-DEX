// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "./Token.sol";

contract Exchange {
   Token token;
   address public tokenAddress;
   uint256 public dexBalance;
   uint256 public tokensPerEth;
   event BuyTokens(address buyer, uint256 amountOfEth, uint256 amountOfTokens);
   
   constructor(address _token) payable {
      require(msg.value > 0 , "You have to at least deposit something to start a DEX");
      dexBalance = msg.value;
      tokenAddress = _token;
      tokensPerEth = 50;
      token = Token(address(tokenAddress));
   }

   function exchangeBalance() public view returns(uint256) {
      return dexBalance;
   }

   function buy() public payable returns (uint256 tokenAmount ) {
      require(msg.value > 0, "You need to send some Ether");
      uint256 amountTobuy = msg.value * tokensPerEth;

      uint256 exchangeBal = address(this).balance;
      require(exchangeBal >= amountTobuy , "Not enough tokens in the reserve");

      address user = msg.sender;
      (bool bought) = token.transfer(user, amountTobuy);
      require(bought , "Failed to transfer");

      emit BuyTokens(msg.sender , msg.value , amountTobuy);
      return amountTobuy;
   }


   function sell(uint256 amount) public {
      require(amount > 0, "You need to sell at least some tokens");

      uint256 userBalance = token.balanceOf(msg.sender);
      require(userBalance >= amount, "You have insufficient tokens");

      uint256 amountOfEthToTransfer = amount / tokensPerEth;
      uint256 ownerEthBalance = address(this).balance;
      require(ownerEthBalance >= amountOfEthToTransfer, "Exchange has insufficient funds");

      uint256 approvedAmt = token.allowance(msg.sender, address(this));
      require(approvedAmt >= amount, "Check the token allowance");
      (bool transfer) = token.transferFrom(msg.sender, payable(address(this)), amount);
      require(transfer , "Failed to transfer from user to exchange");

      (transfer,) = msg.sender.call{value: amountOfEthToTransfer}("");
      require(transfer, "Failed to send Eth to the user");
   }
}