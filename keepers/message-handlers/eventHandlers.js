const PaymentDate = require("../models/paymentDate.js");

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
    }
}

module.exports = handleEvent;