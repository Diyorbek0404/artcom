import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import ApiError from "../error/ApiError.js";

const generateJwt = (username, _id, role) => {
    return jwt.sign(
        { username, _id, role }, 'randomkey'
    )
}
class UserController {
    async registration(req, res, next) {
        const { password, username, email, profilePicture } = req.body
        if (!password || !username || !email || !profilePicture) {
            return next(ApiError.badRequest("parol, email, foydalanuvchi rasmi yoki foydalanuvchi nomi kiritilmagan"))
        }
        const userFind = await User.findOne({ email: email })
        if (userFind) {
            return next(ApiError.badRequest("Bu foydalanuvchi avval ro'yxatdan o'tgan"))
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const user = await User.create({ username, password: hashPassword, email, profilePicture })
        const token = generateJwt(user.username, user._id, user.role)
        return res.send({ user, token })
    }

    async login(req, res, next) {
        const user = await User.findOne({ username: req.body.username })
        if (!user) {
            return next(ApiError.internal("bunday foydalanuvchi topilmadi"))
        }
        let comparePassword = await bcrypt.compare(req.body.password, user.password)
        if (!comparePassword) {
            return next(ApiError.badRequest("Parol xato"))
        }
        const token = generateJwt(user.username, user._id, user.role)
        return res.send({ user, token })
    }
    async getByIdUser(req, res) {
        const user = await User.findById(req.params.id)
        return res.status(200).json(user)
    }

    async updateUser(req, res) {
        const userId = await User.findByIdAndUpdate(req.params.id, { $set: req.body })
        const user = await User.findById(req.params.id)
        return res.status(200).json(user)
    }

    async followUser(req, res) {
        if (req.body.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);
                if (!user.followers.includes(req.body.userId)) {
                    await user.updateOne({ $push: { followers: req.body.userId } });
                    await currentUser.updateOne({ $push: { followings: req.params.id } });
                    return res.status(200).json("user has been followed");
                } else {
                    return res.status(403).json("you allready follow this user");
                }
            } catch (err) {
                res.status(500).json(err);
            }
        } else {
            res.status(403).json("you cant follow yourself");
        }
    }

    async unFollowUser(req, res) {
        if (req.body.userId !== req.params.id) {
            try {
                const user = await User.findById(req.params.id);
                const currentUser = await User.findById(req.body.userId);
                if (user.followers.includes(req.body.userId)) {
                    await user.updateOne({ $pull: { followers: req.body.userId } });
                    await currentUser.updateOne({ $pull: { followings: req.params.id } });
                    return res.status(200).json(currentUser,);
                } else {
                    return res.status(403).json("you dont follow this user");
                }
            } catch (err) {
                return res.status(500).json(err);
            }
        } else {
            return res.status(403).json("you cant unfollow yourself");
        }
    }

    async getFollowings(req, res) {
        const user = await User.findById(req.params.id);
        const friends = await Promise.all(
            user.followings.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        return res.status(200).json(friendList)
    }

    async getFollowers(req, res) {
        const user = await User.findById(req.params.id);
        const friends = await Promise.all(
            user.followers.map((friendId) => {
                return User.findById(friendId);
            })
        );
        let friendList = [];
        friends.map((friend) => {
            const { _id, username, profilePicture } = friend;
            friendList.push({ _id, username, profilePicture });
        });
        return res.status(200).json(friendList)
    }

    async addMessageFriends(req, res, next) {
        const user = await User.findById(req.params.id)
        if (!user.messageFrinds.includes(req.body.userId)) {
            await user.updateOne({ $push: { messageFrinds: req.body.userId } })
            return res.status(200).json("endi siz bu odam bilan yozisha olasiz")
        }
    }

    // async addToSavedPost(req, res) {
    //     const newSavedPost = {
    //         postId:req.body.postId,
    //         postImg:req.body.postImg,
    //         postDate:req.body.postDate,
    //         postText:req.body.postText,
    //         postUserName:req.body.postUserName,
    //         postUserImage:req.body.postUserImage
    //     }
    //     await User.findByIdAndUpdate(req.params.id, { $push: { savedPost: newSavedPost } })
    //     return res.status(200).json("saqlangan postlarga qo'shildi")
    // }
    async addToSavedPost(req, res, next) {
        const user = await User.findById(req.params.id)
        if (!user.savedPost.includes(req.body.postId)) {
            await user.updateOne({ $push: { savedPost: req.body.postId } })
            return res.status(200).json("qo'shildi")
        } else {
            await user.updateOne({ $pull: { savedPost: req.body.postId } })
            return res.status(200).json("olindi")
        }
    }
    async check(req, res, next) {
        const token = generateJwt(_id, username, role)
        return res.json({ token })
    }
    
    async getAllUserOrSearch(req, res) {
        let { username = '' } = req.query
        const user = await User.find()
        if (!username) {
            return res.json("usernameni kiriting")
        } else {
            let found = user.filter(el => el.username == username)
            return res.json(found)
        } 
    }
}

export default new UserController
