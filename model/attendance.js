const mongoose = require("mongoose")
const attendanceSchema = new mongoose.Schema({
    name: String,
    email: String,
    institution: String,
    role: String,
    status : {
        type: String,
        enum : ["Allowed" , "Not Allowed"],
        default: "Allowed"
    }
})

module.exports = mongoose.model("Attendance", attendanceSchema)