const mongoose = require("mongoose")
const reviewSchema = new mongoose.Schema({
    articleName: String,
    satisfy: String,
    aware: String,
    descriptive: String,
    reason_to_title: String,
    original: String,
    significance: String,
    clarity: String,
    procedure: String,
    beneficial: String,
    organization: String,
    complete: String,
    references: String,
    read: String,
    audience: String,
    comment_to_editor: String,
    comment_to_author: String,
    score: String,
    recommendation: String,
    re_review: String,
    Date: String
})

module.exports = mongoose.model("Review", reviewSchema)