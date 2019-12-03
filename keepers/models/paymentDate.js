const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema( { 
    id : {
        type : String,
        required: true
    },
    nextPaymentDate : {
        type : Date,
        required : true
    }
});

module.exports = mongoose.model("PaymentDate", eventSchema);