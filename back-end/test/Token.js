const Token = artifacts.require('Token');

//every contract block uses seperate instance of the contract
contract('Token' , async()=>{
    let token = null;
    let accounts = null;

    before(async()=>{
        token = await Token.deployed();
        accounts = await web3.eth.getAccounts();

    });

    it('Should Deploy Token Properly' , async() =>{
        assert(token != '');
        console.log("Token Contract Address : " , token.address);
    });

    it("Account 01 is the Owner" , async()=>{
        ownerAddress = await token.Owner();
        // console.log("Owner Address : " , ownerAddress);
        // console.log("Accounts[0] : " , accounts[0]);
        console.log("Owner Address " , ownerAddress);
        assert(ownerAddress == accounts[0]);
    });

    it("Owner's Balance should equal to total Supply" , async()=>{
        ownerAddress = await token.Owner();
        supply = await token.totalSupply();
        balance = await token.balanceOf(ownerAddress);
        // console.log("Supply : " , supply.toNumber());
        // console.log("Balance : " , balance.toNumber());
        assert(supply.toNumber() == balance.toNumber());
    });
    

    it('Should Transfer properly' , async()=>{
        let transfer = await token.transfer(accounts[1] , 100);
        balance = await token.balanceOf(accounts[1]);
        assert(balance.toNumber() == 100);
    });

    it('Should TransferFrom Properly' , async()=>{
        let approve = await token.approve(accounts[2] , 1000);
        let approvedAmount = await token.allowance(accounts[0] , accounts[2]);
        // console.log("Approved : " , approvedAmount.toNumber());
        assert(approvedAmount.toNumber() == 1000);
        
        let transfer = await token.transferFrom(accounts[0] , accounts[2] , 500 , {from:accounts[2]});
        balance = await token.balanceOf(accounts[2]);
        assert(balance.toNumber() == 500);
    });
});