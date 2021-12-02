const mongoose = require("mongoose")
const contactSchema = new mongoose.Schema({
    fName: String,
    lName: String,
    email: String,
    password:String,
    phoneNumber: Number,
    country : String,
    institution: String,
    department: String,
    iD: String
})

// userSchema.pre('^find', function(next){
//     Paper.fi
// })

module.exports = mongoose.model("Contact", contactSchema)