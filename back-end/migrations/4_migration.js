const Token = artifacts.require('Token')
const Exchange = artifacts.require('Exchange')

module.exports = function(deployer){
    let tokenName = "SHAH COIN";
    let totalSupply = 1000000000000000;
    let tokenSymbol = "SIMS";
    deployer.deploy(Token , tokenName , tokenSymbol , totalSupply).then(()=>{
        return deployer.deploy(Exchange , Token.address , {value:10000000})
    });
};
