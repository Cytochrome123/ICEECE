const mongoose = require("mongoose")
var passportlocalmongoose=require("passport-local-mongoose");
const userSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    Username: String,
    Password:String,
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
    publicProfile: [String],
    papers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Paper"
        }
    ],
    role: {
        type: String,
        enum : ['Super Admin',"Program Manager", "Speaker", "Reviewer" ,'user', "Presenter", "Protocol Officer", "Sales-Manager"],
        default: "user"
    },
    rp:String
})


// userSchema.pre('^find', function(next){
//     Paper.fi
// })

userSchema.plugin(passportlocalmongoose);
module.exports = mongoose.model("User", userSchema)