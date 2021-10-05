const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    Username:String,
    Password:String,
    role: {
        type: String,
        enum : ['admin', 'user'],
        default: "user"
    }
})


module.exports = mongoose.model("User", userSchema)