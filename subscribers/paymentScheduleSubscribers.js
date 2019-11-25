require('dotenv').config()
const mongoose = require("mongoose");
const Event = require("./models/events.js")

mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection
db.on("error", (error) => console.error(error) );
db.once("open", () => console.log("Connected to database") );

const kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }),
  consumer = new Consumer(client, [{ topic: "contract-events", partition: 0 }], {
    autoCommit: false
  });

const messageHandlers = {
  "PaymentScheduleCreated" : async (details) => {
      var event = new Event();
      event.name = details.name;
      event.eventId = details.id;
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
      event.data = {
        owner : details.nonIndexedParameters[0].value,
        amount : details.nonIndexedParameters[1].value,
      }
      return event;
    }
}

consumer.on("message", async function(message) {
  let msgObj = JSON.parse(message.value);
  try {
    const eventAlreadyLogged = await Event.exists({ eventId: msgObj.details.id });
    if (!eventAlreadyLogged) {
      const event = await messageHandlers[msgObj.details.name](msgObj.details);
      const newEvent = await event.save();
      console.log(newEvent);
    }
  } catch (error) {
    console.error(error);
  }
});