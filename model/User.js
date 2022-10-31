import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        max: 20,
        min: 2
    },
    email: {
        type: String,
        required: true,
        max: 50,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        min: 6
    },
    backgroundPicture: {
        type: String,
        default: "https://social.webestica.com/assets/images/bg/05.jpg",
    },
    profilePicture: {
        type: String,
        required:true
    },
    followers: {
        type: Array,
        default: [],
    },
    followings: {
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc: {
        type: String,
        max: 300,
        default:""
    },
    country: {
        type: String,
        max: 100,
        default:""
    },
    cityOrRegion: {
        type: String,
        max: 100,
        default:""
    },
    expert: {
        type: String,
        max: 100,
        default:""
    },
    relationship: {
        type: Number,
        enum: [1, 2, 3],
    },
    contacts: [{
        username:String,
        userId:String,
    }],
    stories: [{
        backImage:String,
        userId:String,
        username:String,
        profilePicture:String,
        video:String
    }],
    messageFrinds:{
        type:Array,
        default:[]
    },
    savedPost: {
        type: Array,
        default: [],
    },
    role:{
        type:String,
        default:"User"
    }
}, {
    timestamps: true
})

export default mongoose.model("User", UserSchema)