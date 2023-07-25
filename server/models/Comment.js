const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let commentSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    post: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Post'
    }
},
{
    timestamps: true
}
);

module.exports = mongoose.model("Comment", commentSchema, "comments");