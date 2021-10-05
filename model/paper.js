const mongoose = require("mongoose")
const paperSchema = new mongoose.Schema({
    institution:String,
    department:String,
    position:String,
    title:String,
    passport:String,
    fileName: String,
    filePath:String
})

module.exports = mongoose.model("Paper", paperSchema)

// feed these from register model (form)

// firstName:String,
    // lastName:String,
    // email:String,
    // phoneNumber:Number,