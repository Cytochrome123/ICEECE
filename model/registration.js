const mongoose = require("mongoose")
const registrationSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    password:String,
    phoneNumber: Number,
    country : String,
    institution: String,
    department: String,
    category: String,
    qrcode: String,
    isVerified: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum : ['Super Admin',"Program Manager", "Speaker", "Reviewer" ,'user', "Protocol Officer"],
        default: "user"
    }
})

// userSchema.pre('^find', function(next){
//     Paper.fi
// })

module.exports = mongoose.model("Registration", registrationSchema)