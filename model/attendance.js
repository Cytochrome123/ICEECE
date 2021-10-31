const mongoose = require("mongoose")
const attendanceSchema = new mongoose.Schema({
    email: String,
    role: String,
    status : {
        type: String,
        enum : ["Allowed" , "Not Allowed"],
        default: "Allowed"
    }
})

module.exports = mongoose.model("Attendance", attendanceSchema)