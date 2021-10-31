const mongoose = require("mongoose")
const sessionSchema = new mongoose.Schema({
    name: String,
    type : String,
    duration: String,
    startDate: String,
    startTime: String,
    endDate : String,
    endTime : String,
    access : [String],
    role: [String],
    moderator: [String],
    speakers: [String],
    topic:String,
    pDetails:String,
    status : {
        type: String,
        enum : ["ongoing" , "finished"],
        default: "ongoing"
    }
})

module.exports = mongoose.model("Session", sessionSchema)