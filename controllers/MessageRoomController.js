import MessageRom from "../model/MessageRom.js";
import ApiError from "../error/ApiError.js";

class MessageRoomController {
    async createRoom(req, res, next) {
        const newRoom = new MessageRom(req.body)
        if (newRoom) {
            const post = await newRoom.save();
            return res.status(200).json(post)
        }
        return next(ApiError.badRequest("Yangi chat ochilmadi"))
    }
    async getAllRooms(req, res) {
        let { userOne = '', userTwo = "", _id = "" } = req.query
        const room = await MessageRom.find().sort({ $natural: -1 })
        if (!userOne && !userTwo && !_id) {
            return res.json("ikkala userning id sini kiriting")
        } else if (userOne && !userTwo && _id) {
            return res.json("ikkinchi userning id sini kiriting")
        } else if (!userOne && userTwo && _id) {
            return res.json("birinchi userning id sini kiriting")
        } else if (!userOne && !userTwo && _id) {
            let found = room.filter(el => el._id == _id)
            return res.json(found)
        }  else {
            let found = room.filter(el => el.userOne == userOne && el.userTwo == userTwo)
            return res.json(found)
        }
    }

}

export default new MessageRoomController
