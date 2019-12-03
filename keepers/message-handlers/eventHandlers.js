const PaymentDate = require("../models/paymentDate.js");

async function handleEvent(event) {
    try {
        var handler = eventHandlers[event.name];
        if (handler) {
            Console.log(`Handling event ${event.name} ...`)
            await handler(event);
        }
    } catch (error) {
        console.error(`Error handling event ${event.name}`);
        console.error(error);
    };
}
const eventHandlers = {
    "NextPaymentDateSet" : async (event) => {
        const alreadyExists = await PaymentDate.exists({ data : { id : event.data.id }});
        if (alreadyExists) {
            var paymentDate = await PaymentDate.find().byId(event.data.id);
            paymentDate.nextPaymentDate = event.data.nextPaymentDate;
            paymentDate.save();
        }
        else {
            var paymentDate = new PaymentDate();
            paymentDate.id = event.data.id;
            paymentDate.nextPaymentDate = event.data.nextPaymentDate;
            paymentDate.save();
        }
    }
}

module.exports = handleEvent;