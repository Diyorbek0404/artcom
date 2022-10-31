import mongoose from "mongoose";

const PostSchema = new mongoose.Schema({
    userId: {
        type: String,
    },
    username: {
        type: String,
    },
    userImage:{
        type:String,
    },
    expertOfUser:{
        type:String
    },
    postMessage: {
        type: String,
    },
    likes: {
        type: Array,
        default: [],
    },
    img: {
        type: Array,
        default: [],
    },
    comments: [{
        username:String,
        userId:String,
        text:String,
        date:String,
        userImage:String
    }],
    category:{
        type:String,
        required:true,
        max:60
    }
}, {
    timestamps: true
})

export default mongoose.model("Post", PostSchema)