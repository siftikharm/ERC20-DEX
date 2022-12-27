const Token = artifacts.require('Token')
const Exchange = artifacts.require('Exchange')
const Factory = artifacts.require('Factory')

module.exports = async function(deployer){
    let tokenName = "SHAH COIN";
    let totalSupply = 1000000000000000;
    let tokenSymbol = "SIMS";

    deployer.deploy(Token , tokenName , tokenSymbol , totalSupply).then(()=>{
        deployer.deploy(Exchange , Token.address , {value:10000000}).then(()=>{
            return deployer.deploy(Factory);
        })
    });
};
