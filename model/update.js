const mongoose = require("mongoose")
const time = require("mongoose-timestamp")

const updateSchema = new mongoose.Schema({
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
    corrections:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

updateSchema.plugin(time) 

module.exports = mongoose.model("Update", updateSchema)
