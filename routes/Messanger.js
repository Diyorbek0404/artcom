import Router from "express";
const router = new Router();
import Messanger from "../controllers/MessengerController.js";
import checkRole from "../middlewares/checkRoleMiddleware.js";


router.post("/", checkRole("User"), Messanger.addText)
router.get("/", Messanger.getAllMessage)

export default router