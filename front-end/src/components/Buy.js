import React, { Component } from 'react';
import Web3 from 'web3'; 
import { EXCHANGE_ABI, EXCHANGE_ADDRESS } from '../config';

export default class Buy extends Component {

    constructor(){
        super();
        this.state  = {address: "" , amount:"" , contract:""}
    }

    async buyCoin() {
        console.log("Buy Coin");
        const address = document.getElementById("addr").value;
        const amount = document.getElementById("amt").value;
        console.log("Address : "  , address);
        console.log("Amount :" ,  amount);
        // this.setState({address: address , amount: amount});

        try {
            const web3 = new Web3(Web3.givenProvider || "http://localhost:8545");
            const accounts = await web3.eth.getAccounts();
            const request = await this.state.contract.methods.buy().send({from:address , value:amount});
            alert("Tokens Bought Sucessfully");
        } catch (error) {
            alert("Failed to Buy");
            console.error(error);
        }
    }

    componentDidMount(){
        this.loadBlockchain()
    }

    async loadBlockchain() {
        const web3 = new Web3(Web3.givenProvider || "http://localhost:8545"); 
        const exchange = new web3.eth.Contract(EXCHANGE_ABI , EXCHANGE_ADDRESS);
        this.setState({contract:exchange});
    }

  render() {
    return (
        <section className="p-6 dark:bg-gray-800 dark:text-gray-50">
            <form noValidate="" action="" className="container flex flex-col mx-auto space-y-12 ng-untouched ng-pristine ng-valid">
                <fieldset className="grid grid-cols-4 gap-6 p-6 rounded-md shadow-sm dark:bg-gray-900">
                    <div className="space-y-2 col-span-full lg:col-span-1">
                        <p className="font-medium">Buy SHA Coin</p>
                        <p className="text-xs">25 din mein paisa double</p>
                    </div>
                    <div className="grid grid-cols-6 gap-4 col-span-full lg:col-span-3">
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="username" className="text-sm">Address</label>
                            <input id="addr" type="text" placeholder="Address" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                        </div>
                        <div className="col-span-full sm:col-span-3">
                            <label htmlFor="website" className="text-sm">Amount</label>
                            <input id="amt" type="text" placeholder="SHA" className="w-full rounded-md focus:ring focus:ring-opacity-75 focus:ring-violet-400 dark:border-gray-700 dark:text-gray-900" />
                        </div>
                        <div className="col-span-full">
                            <button type="button" className="px-6 py-2 border rounded-md dark:border-gray-100" onClick={this.buyCoin}  >Buy</button>
                        </div>
                    </div>
                </fieldset>
            </form>
        </section>
    )
  }
}
