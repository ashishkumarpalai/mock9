const mongoose = require("mongoose")

const postSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
        text: String,
        image: String,
        createdAt: Date,
        likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }],
        comments: [{
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
            text: String,
            createdAt: Date
        }]
    }
)

const PostModel = new mongoose.model("post", postSchema)

module.exports = { PostModel }