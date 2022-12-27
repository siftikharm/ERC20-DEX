const Exchange = artifacts.require('Exchange');
const Token = artifacts.require('Token');

//every contract block uses seperate instance of the contract
contract('Exchange' , ()=>{
    let exchange = null;
    let accounts = null;
    let token = null;

    before(async()=>{
        exchange = await Exchange.deployed();
        token = await Token.deployed();
        accounts = await web3.eth.getAccounts();
    });

    it('Should Deploy Exchange Properly' , async() =>{
        assert(exchange != '');
        console.log("Exchange Contract Address : " , exchange.address);
    });

    it('Should Buy Properly' , async()=>{

        let approve = await token.approve(exchange.address , 1000);
        let approvedAmount = await token.allowance(accounts[0] , exchange.address);

        let transfer = await token.transfer(accounts[1] , 500 , {from:accounts[0]});
        balance = await token.balanceOf(accounts[1]);
        // console.log("Balance Account[1] : " , balance.toNumber());

        let buy = await exchange.buy({from:accounts[1] ,  value: 1});
        // console.log("Buy Amount :" , buy);

    });

    it('Should Sell Properly' , async()=>{
        let approve = await token.approve(exchange.address , 1000);
        let approvedAmount = await token.allowance(accounts[0] , exchange.address);
        // console.log("Approved : " , approvedAmount.toNumber());
        assert(approvedAmount.toNumber() == 1000);
        let sell = await exchange.sell(100);
    });
});