const mongoose = require("mongoose")
const contactSchema = new mongoose.Schema({
    fileName: String,
    filePath:String,
    fName: String,
    lName: String,
    email: String,
    password:String,
    phoneNumber: Number,
    country : String,
    institution: String,
    department: String,
    category: String,
    qrcode: String
})

// userSchema.pre('^find', function(next){
//     Paper.fi
// })

module.exports = mongoose.model("Contact", contactSchema)