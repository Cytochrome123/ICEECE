const mongoose = require("mongoose")
const paymentSchema = new mongoose.Schema({
    fName: String,
    email : String,
    mode: String,
    amount : Number,
    proofName: String,
    proofPath : String,
    status : {
        type: String,
        enum : ["pending" , "approved"],
        default: "pending"
    }
})

module.exports = mongoose.model("Payment", paymentSchema)