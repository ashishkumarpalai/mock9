const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        dob: Date,
        bio: String,
        posts: [{
            post:{ type: mongoose.Schema.Types.ObjectId, ref: 'post' }
        }],
        friends: [{user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }}],
        friendRequests: [{user:{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }}]
    }
)

const UserModel=new mongoose.model("user",userSchema)

module.exports={UserModel}