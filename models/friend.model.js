const mongoose = require("mongoose")

const friendSchema = mongoose.Schema(
    {
        "user":String,
       status:{type:String,enum:["requested","accepted","rejected"],default:"requested"}
    }
)

const FriendModel=new mongoose.model("friend",friendSchema)

module.exports={FriendModel}