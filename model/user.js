const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    Username:String,
    Password:String,
    papers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Paper"
        }
    ],
    role: {
        type: String,
        enum : ['admin',"reviewer" ,'user'],
        default: "user"
    }
})


module.exports = mongoose.model("User", userSchema)