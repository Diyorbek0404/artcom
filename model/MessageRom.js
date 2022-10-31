import mongoose from "mongoose";

const MessageRomSchema = new mongoose.Schema({
    nameOne: {
        type: String,
    },
    nameTwo: {
        type: String,
    },
    userOne:{
        type:String
    },
    userTwo: {
        type:String
    }
}, {
    timestamps: true
})

export default mongoose.model("MessageRom", MessageRomSchema)