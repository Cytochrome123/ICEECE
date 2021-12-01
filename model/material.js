const mongoose = require("mongoose")
const materialSchema = new mongoose.Schema({
    Name: String,
    Amount: String
})

module.exports = mongoose.model("Material", materialSchema)