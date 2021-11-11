const mongoose = require("mongoose")
const paymentSchema = new mongoose.Schema({
    fName: String,
    email : String,
    mode: String,
    rrr: Number,
    amount : Number,
    proofName: String,
    proofPath : String,
    status : {
        type: String,
        enum : ["Not Paid", "Not Aprroved" , "Approved"],
        default: "Not Paid"
    }
})

module.exports = mongoose.model("Payment", paymentSchema)