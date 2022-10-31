import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
    userIdOne: {
        type: String,
    },
    userIdTwo: {
        type: String,
    },
    messageRomId:{
        type:String
    },
    userName:{
        type:String,
        required:true
    },
    userId:{
        type:String,
        required:true
    },
    text:{
        type:String,
        required:true
    }
}, {
    timestamps: true
})

export default mongoose.model("Message", MessageSchema)