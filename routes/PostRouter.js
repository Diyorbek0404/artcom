import Router from "express";
const router = new Router();
import PostController from "../controllers/PostController.js";
import checkRole from "../middlewares/checkRoleMiddleware.js";


router.post("/", checkRole("User"), PostController.createPost)
router.get("/", PostController.getAllPost)
router.get("/:id", PostController.getById)
router.put("/:id/likes", checkRole("User"), PostController.likePost)
router.put("/:id/comments", checkRole("User"), PostController.commentNews)
router.delete("/:id", checkRole("User"), PostController.deletePost)
router.get("/:id/comments", PostController.getAllComments)

export default router