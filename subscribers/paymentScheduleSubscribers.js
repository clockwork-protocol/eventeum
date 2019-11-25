var kafka = require("kafka-node"),
  Consumer = kafka.Consumer,
  client = new kafka.KafkaClient({ kafkaHost: 'localhost:9092' }),
  consumer = new Consumer(client, [{ topic: "contract-events", partition: 0 }], {
    autoCommit: false
  });

var messageHandlers = {
  "PaymentScheduleCreated" : (details) => {
      var event = {};
      event.name = details.name;
      event.id = details.nonIndexedParameters[0].value;
      event.paymentLeeway = details.nonIndexedParameters[1].value;
      event.owner = details.nonIndexedParameters[2].value;
      event.destination = details.nonIndexedParameters[3].value;
      event.subscriptionAmount = details.nonIndexedParameters[4].value;
      console.log(event);
    },
  "NextPaymentDateSet" : (details) => {
      var event = {};
      event.name = details.name;
      event.id = details.nonIndexedParameters[0].value;
      event.nextPaymentDate = new Date(details.nonIndexedParameters[1].value * 1000);
      console.log(event);
    },
  "Deposit" : (details) => {
      var event = {};
      event.name = details.name;
      event.owner = details.nonIndexedParameters[0].value;
      event.amount = details.nonIndexedParameters[1].value;
      console.log(event);
    }
}

consumer.on("message", function(message) {
  let msgObj = JSON.parse(message.value);
  //messageHandlers[msgObj.details.name](msgObj);
  // msgObj.details.nonIndexedParameters.forEach(param => {
  //   console.log(param);
  // });
  messageHandlers[msgObj.details.name](msgObj.details);
  console.log();
});