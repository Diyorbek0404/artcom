import Router from "express";
const router = new Router();;
import UserController from "../controllers/UserController.js"

router.post("/registration", UserController.registration);
router.post("/login", UserController.login);
router.get("/:id", UserController.getByIdUser);
router.put("/:id", UserController.updateUser);
router.get("/:id/followings", UserController.getFollowings);
router.get("/:id/followers", UserController.getFollowers);
router.put("/:id/follow", UserController.followUser);
router.put("/:id/unfollow", UserController.unFollowUser);
router.post("/:id/chatFriend", UserController.addMessageFriends);
router.put("/:id/savedpost", UserController.addToSavedPost);
router.get("/", UserController.getAllUserOrSearch);

export default router