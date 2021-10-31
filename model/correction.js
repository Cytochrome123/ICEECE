const mongoose = require("mongoose")
const time = require("mongoose-timestamp")

const correctionSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    title:String,
    author: String,
    fileName: String,
    filePath:String,
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    updates: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

correctionSchema.plugin(time) 

module.exports = mongoose.model("Correction", correctionSchema)

