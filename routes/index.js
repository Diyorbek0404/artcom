import {Router} from "express";
const router  = new Router()
import UserRouter from "./UserRouter.js"
import PostRouter from "./PostRouter.js"
import CategoryRouter from "./CategoryRouter.js"
import MessageRoomRouter from "./MessageRoomRouter.js"
import Messanger from "./Messanger.js";

router.use("/user", UserRouter)
router.use("/post", PostRouter)
router.use("/category", CategoryRouter)
router.use("/messageroom/", MessageRoomRouter)
router.use("/chat/", Messanger)

export default router