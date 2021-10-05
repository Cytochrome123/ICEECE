const mongoose = require("mongoose")
const reviewSchema = new mongoose.Schema({
    name: String,
    satisfactory: String
})

module.exports = mongoose.model("Review", reviewSchema)