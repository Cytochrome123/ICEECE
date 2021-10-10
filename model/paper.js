const mongoose = require("mongoose")
const time = require("mongoose-timestamp")

const paperSchema = new mongoose.Schema({
    institution:String,
    department:String,
    position:String,
    title:String,
    author: String,
    passport:String,
    fileName: String,
    filePath:String,
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review"
        }
    ]
})

paperSchema.plugin(time) 

module.exports = mongoose.model("Paper", paperSchema)

// feed these from register model (form)

// firstName:String,
    // lastName:String,
    // email:String,
    // phoneNumber:Number,