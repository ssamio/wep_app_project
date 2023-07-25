const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let postSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
},
{
    timestamps: true
});

module.exports = mongoose.model("Post", postSchema, "posts");