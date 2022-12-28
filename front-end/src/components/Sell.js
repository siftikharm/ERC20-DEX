import React, { Component } from 'react'
import Web3 from 'web3'; 
import { EXCHANGE_ABI, EXCHANGE_ADDRESS , TOKEN_ABI , TOKEN_ADDRESS} from '../config';

export default class Sell extends Component {

    constructor(){
        super();
        this.state  = {address: "" , amount:"" , contract:""}
    }

    async sellCoin(){
        console.log("Sell Coin");
        const address = document.getElementById("sAddr").value;
        const amount = document.getElementById("sAmt").value;
        console.log("Address : "  , address);
        console.log("Amount :" ,  amount);
        
        try {
            const web3 = new Web3(Web3.currentProvider || "http://localhost:8545");
            let account0;
            await web3.eth.getAccounts().then(function(result){
                account0 = result[0];
            })
            
            const token = new web3.eth.Contract(TOKEN_ABI , TOKEN_ADDRESS);

            let request = await token.methods.approve(EXCHANGE_ADDRESS , amount).send({from:account0});
            
            const exchange = new web3.eth.Contract(EXCHANGE_ABI , EXCHANGE_ADDRESS);
            request = await exchange.methods.sell(amount).send({from:address});
            alert("Tokens sold");
        } catch (error) {
            alert("Error Selling Tokens");
            console.error(error);
        } 
    }

    componentDidMount(){
        this.loadBlockchain()
    }

    async loadBlockchain() {
        const web3 = new Web3(Web3.currentProvider || "http://localhost:8545"); 
        const exchange = new web3.eth.Contract(EXCHANGE_ABI , EXCHANGE_ADDRESS);
        this.setState({contract:exchange});
    }

  render() {
    return (
        <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
        <form noValidate="" action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
            <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                <div className="space-y-2 col-span-full lg:col-span-1">
                    <p className="font-medium">Sell SHA Coin</p>
                    <p className="text-xs">25 din mein paisa double</p>
                </div>
                <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                    <div className="col-span-full sm:col-span-3">
                        <label htmlFor="username" className="text-sm">Address</label>
                        <input id="sAddr" type="text" placeholder="Address" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                    </div>
                    <div className="col-span-full sm:col-span-3">
                        <label htmlFor="website" className="text-sm">Amount</label>
                        <input id="sAmt" type="number" placeholder="SHA" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                    </div>
                    <div className="col-span-full">
                        <button type="button" className="px-6 py-3 border rounded-md dark:border-gray-100" onClick={this.sellCoin} >Sell</button>
                    </div>
                </div>
            </fieldset>
        </form>
        </section>
    )
  }
}


// const sellCoin = ()=>{
//     console.log("Sell Coin");
//     console.log(document.getElementById("sAddr").value);
//     console.log(document.getElementById("sAmt").value);
// }



// const Sell = () => {
//   return (
//     <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
//     <form noValidate="" action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
//         <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
//             <div className="space-y-2 col-span-full lg:col-span-1">
//                 <p className="font-medium">Sell SHA Coin</p>
//                 <p className="text-xs">25 din mein paisa double</p>
//             </div>
//             <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
//                 <div className="col-span-full sm:col-span-3">
//                     <label htmlFor="username" className="text-sm">Address</label>
//                     <input id="sAddr" type="text" placeholder="Address" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
//                 </div>
//                 <div className="col-span-full sm:col-span-3">
//                     <label htmlFor="website" className="text-sm">Amount</label>
//                     <input id="sAmt" type="number" placeholder="SHA" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
//                 </div>
//                 <div className="col-span-full">
//                     <button type="button" className="px-6 py-3 border rounded-md dark:border-gray-100" onClick={sellCoin} >Sell</button>
//                 </div>
//             </div>
//         </fieldset>
//     </form>
//     </section>
//   )
// }

// export default Sell