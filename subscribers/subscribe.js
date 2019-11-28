require('dotenv').config();
const mongoose = require("mongoose");
const Event = require("./models/events.js");
const messageLoggers = require("./message-handlers/messageLoggers");

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

consumer.on("message", async function(message) {
  let msgObj = JSON.parse(message.value);
  try {
    const eventAlreadyHandled = await Event.exists({ eventId: msgObj.details.id });
    if (!eventAlreadyHandled) {
      //log the event
      const event = await messageLoggers[msgObj.details.name](msgObj.details);
      //todo: call event handlers
      const newEvent = await event.save();
      console.log(newEvent);
    }
  } catch (error) {
    console.error(error);
  }
});