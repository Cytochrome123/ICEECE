const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
    day: String,
    name: String,
    type: String,
    duration: String,
    startTime: String,
    endTime: String,
    live: String,
    access: [String],
    role: [String],
    moderator: [String],
    speakers: [String],
    topic: String,
    cameraReady: [
        Object
    ], 
    slide: [
        Object
    ],
    status: {
        type: String,
        enum: ["upcoming" , "ongoing", "finished"],
        default: "upcoming",
    },
});

module.exports = mongoose.model("Session", sessionSchema);