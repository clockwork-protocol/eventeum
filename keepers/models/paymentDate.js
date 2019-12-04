const mongoose = require("mongoose");
const paymentDateSchema = new mongoose.Schema( { 
    id : {
        type : String,
        required: true
    },
    nextPaymentDate : {
        type : Date,
        required : true
    }
});

paymentDateSchema.statics.updatePaymentDate = async function (id, newPaymentDate) {
    var paymentDate = await this.findOne({ id : id });
    console.log(`Updating payment date from ${paymentDate.nextPaymentDate.toUTCString()} to ${newPaymentDate.toUTCString()}`)
    paymentDate.nextPaymentDate = newPaymentDate;
    paymentDate.save();
  }

module.exports = mongoose.model("PaymentDate", paymentDateSchema);