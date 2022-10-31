import Router from "express";
const router = new Router();
import MessageRoomController from "../controllers/MessageRoomController.js";
import checkRole from "../middlewares/checkRoleMiddleware.js";


router.post("/", checkRole("User"), MessageRoomController.createRoom)
router.get("/", MessageRoomController.getAllRooms)

export default router