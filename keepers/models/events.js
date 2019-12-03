const mongoose = require("mongoose");
const eventSchema = new mongoose.Schema( { 
    name : {
        type : String,
        required: true
    },
    eventId : {
        type : String,
        required : true
    },
    blockNumber : {
        type : Number,
        required : true
    },
    data : mongoose.Mixed
});

module.exports = mongoose.model("Events", eventSchema);