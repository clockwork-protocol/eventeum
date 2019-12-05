const PaymentDate = require("../models/paymentDate.js");

//connect to Ethereum
const rpcURL = process.env.ETHEREUM_RPC_URL;
const Web3 = require('web3');
const web3 = new Web3(rpcURL);
const Payment = require(process.env.PAYMENT_ABI);
const payment = new web3.eth.Contract(Payment.abi, process.env.PAYMENT_ADDRESS);

async function handleEvent(event) {
    try {
        var handler = eventHandlers[event.name];
        if (handler) {
            console.log(`Handling event ${event.name} ...`)
            await handler(event);
        }
    } catch (error) {
        console.error(`Error handling event ${event.name}`);
        console.error(error);
    };
}
const eventHandlers = {
    "NextPaymentDateSet" : async (event) => {
        const alreadyExists = await PaymentDate.exists({ id : event.data.id });
        if (alreadyExists) {
            await PaymentDate.updatePaymentDate(event.data.id, event.data.nextPaymentDate);
        }
        else {
            console.log("Creating new PaymentDate")
            var paymentDate = new PaymentDate();
            paymentDate.id = event.data.id;
            paymentDate.nextPaymentDate = event.data.nextPaymentDate;
            paymentDate.save();
        }
    },
    "PaymentCreated" : async (event) => {
        console.log(`Executing payment ${event.data.id}`);
    try {
        let result = await payment.methods.execute(event.data.id).send({from : process.env.KEEPER_ADDRESS, gas: 6721975});
        console.log(`Success : Transaction hash ${result.transactionHash}`);
    }
    catch (err) {
        console.error(err);
    }
    }
}

module.exports = handleEvent;