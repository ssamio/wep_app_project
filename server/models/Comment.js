const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true
    },
    timestamp: true
});

module.exports = mongoose.model("Comment", commentSchema, "comments");