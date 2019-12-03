require('dotenv').config();
const mongoose = require("mongoose");
const Web3 = require('web3');
const PaymentDate = require("./models/paymentDate.js");
const {setIntervalAsync} = require('set-interval-async/dynamic');

const interval = parseInt(process.env.PAYMENT_GENERATION_INTERVAL);

//connect to Ethereum
const rpcURL = process.env.ETHEREUM_RPC_URL;
const web3 = new Web3(rpcURL);

//connect to DB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on("error", (error) => console.error(error) );
db.once("open", () => console.log("Connected to database") );

processPayments = (err, duePayments) => {
    if (err) {
        console.error(err)
    }
    console.log(`Found ${duePayments.length} due payments.`);
}

setIntervalAsync(
    async () => {
        const blockNumber = await web3.eth.getBlockNumber();
        const block = await web3.eth.getBlock(blockNumber);
        const time = new Date(block.timestamp*1000)
        console.log(`Checking for due payments @ block #${blockNumber} on ${time.toUTCString()}`) 
        PaymentDate.find({ nextPaymentDate : { $lt : time}}, processPayments);
    },
    interval
);