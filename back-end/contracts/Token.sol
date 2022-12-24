// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
 
contract Token {
   mapping(address => uint256) balances;
   mapping(address => mapping (address => uint256)) allowed;
   string name_;
   string symbol_;
   uint256 totalSupply_;
   address public owner;

   event Transfer(address indexed from, address indexed to, uint tokens);
   event Approval(address indexed tokenOwner, address indexed spender, uint tokens);
   
   constructor(string memory _name, string memory _symbol, uint256 _total) {
      name_ = _name;
      symbol_ = _symbol;
      totalSupply_ = _total;
      balances[msg.sender] = totalSupply_;
      owner = msg.sender;
   }
   
   function name() public view returns (string memory) {
      return name_;
   }

   function symbol() public view returns (string memory) {
      return symbol_;
   }

   function totalSupply() public view returns (uint256) {
      return totalSupply_;
   }

   function balanceOf(address tokenOwner) external view returns (uint) {
      return balances[tokenOwner];
   }

   function Owner() public view returns (address) {
      return owner;
   }

   function transfer(address _receiver, uint _amount) public returns (bool) {
      require(_amount <= balances[msg.sender] , 'Not Enough Tokens');
      balances[msg.sender] -= _amount;
      balances[_receiver] += _amount;
      emit Transfer(msg.sender, _receiver, _amount);
      return true;
   }

   function approve(address _delegate, uint _amount) public returns (bool) {
      allowed[msg.sender][_delegate] = _amount;
      emit Approval(msg.sender, _delegate, _amount);
      return true;
   }

   function allowance(address _owner, address _delegate) public view returns (uint) {
      return allowed[_owner][_delegate];
   }

   // This function would be Called by a delegated third party
   function transferFrom(address _owner, address _receiver, uint _amount) public returns (bool) {
      require(_amount <= balances[_owner] , 'owner does not have enough tokens');   
      require(_amount <= allowed[_owner][msg.sender] , 'not allowed');
      balances[_owner] -= _amount;
      allowed[_owner][msg.sender] -= _amount;
      balances[_receiver] += _amount;
      return true;
   }

}