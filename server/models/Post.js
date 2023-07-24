const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true
    },
    timestamp: true
});

module.exports = mongoose.model("Post", postSchema, "posts");