import Messanger from "../model/Messanger.js";
import ApiError from "../error/ApiError.js";

class MessageRoomController {
    async addText(req, res, next) {
        const newText = new Messanger(req.body)
        if (newText) {
            const post = await newText.save();
            return res.status(200).json(post)
        }
        return next(ApiError.badRequest("Yangi chat ochilmadi"))
    }
    async getAllMessage(req, res) {
        let { userIdOne = '', userIdTwo = "", messageRomId = "" } = req.query
        const chat = await Messanger.find().sort({ $natural: -1 })
        if (!userIdOne && !userIdTwo && !messageRomId) {
            return res.json("ikkala userning idsi va MessageRoom id ini kiriting ")
        } else if (!userIdOne && userIdTwo && messageRomId) {
            return res.json("birinchi userning id sini kiriting")
        } else if (userIdOne && !userIdTwo && messageRomId) {
            return res.json("ikkimessageroomning id sini kiriting")
        } else if (userIdOne && userIdTwo && !messageRomId) {
            return res.json("ikkinchi userning id sini kiriting")
        } else {
            let found = chat.filter(el => el.userIdOne == userIdOne && el.userIdTwo == userIdTwo && el.messageRomId == messageRomId)
            return res.json(found)
        }
    }

}

export default new MessageRoomController
