const Event = require("../models/events.js");

const messageLoggers = {
    "PaymentScheduleCreated" : async (details) => {
        var event = new Event();
        event.name = details.name;
        event.eventId = details.id;
        event.blockNumber = details.blockNumber;
        event.data = {
            id : details.nonIndexedParameters[0].value,
            paymentLeeway : details.nonIndexedParameters[1].value,
            owner : details.nonIndexedParameters[2].value,
            destination : details.nonIndexedParameters[3].value,
            subscriptionAmount : details.nonIndexedParameters[4].value
        }
        return event;
    },
    "NextPaymentDateSet" : async (details) => {
        var event = new Event();
        event.name = details.name;
        event.eventId = details.id;
        event.blockNumber = details.blockNumber;
        event.data = {
            id : details.nonIndexedParameters[0].value,
            nextPaymentDate : new Date(details.nonIndexedParameters[1].value * 1000)
        }
        return event;
    },
    "Deposit" : async (details) => {
        var event = new Event();
        event.name = details.name;
        event.eventId = details.id;
        event.blockNumber = details.blockNumber;
        event.data = {
            owner : details.nonIndexedParameters[0].value,
            amount : details.nonIndexedParameters[1].value,
        }
        return event;
    },
    "PaymentCreated" : async (details) => {
        var event = new Event();
        event.name = details.name;
        event.eventId = details.id;
        event.blockNumber = details.blockNumber;
        event.data = {
            id : details.nonIndexedParameters[0].value,
            overdueDate : new Date(details.nonIndexedParameters[1].value * 1000),
            paymentAmount : details.nonIndexedParameters[2].value,
            destination : details.nonIndexedParameters[3].value
        }
        return event;
    }
}

module.exports = messageLoggers;