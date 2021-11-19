const mongoose = require("mongoose");
const sessionSchema = new mongoose.Schema({
    day: String,
    name: String,
    type: String,
    duration: String,
    startDate: String,
    startTime: String,
    endDate: String,
    endTime: String,
    access: [String],
    role: [String],
    moderator: [String],
    speakers: [String],
    topic: String,
    fileName: String,
    filePath: String,
    status: {
        type: String,
        enum: ["ongoing", "finished"],
        default: "ongoing",
    },
});

module.exports = mongoose.model("Session", sessionSchema);