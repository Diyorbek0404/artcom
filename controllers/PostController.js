import Post from "../model/Post.js";
import ApiError from "../error/ApiError.js";

class PostController {
    async createPost(req, res, next) {
        const newPost = new Post(req.body)
        if (newPost) {
            const post = await newPost.save();
            return res.status(200).json(post)
        }
        return next(ApiError.badRequest("Post qo'shishda xato"))
    }

    async commentNews(req, res) {
        const newComment = {
            username: req.body.username,
            text: req.body.text,
            userId: req.body.userId,
            date: req.body.date,
            userImage: req.body.userImage
        }
        const post = await Post.findById(req.params.id)
        await post.updateOne({ $push: { comments: newComment } })
        return res.status(200).json("sizning fikringiz qo'shildi")
    }

    async getAllComments(req, res) {
        const post = await Post.findById(req.params.id)
        return res.status(200).json(post.comments)
    }

    async getAllPost(req, res) {
        let { postMessage = '', _id = "" } = req.query
        const post = await Post.find().sort({ $natural: -1 })
        if (!postMessage && !_id) {
            let found = post
            return res.json(found)
        } else if (_id && !postMessage) {
            let found = post.filter(el => el.userId == _id)
            return res.json(found)
        } else {
            let found = post.filter(el => el.postMessage == postMessage && el.userId == _id)
            return res.json(found)
        }
    }

    async getById(req, res) {
        const post = await Post.findById(req.params.id)
        return res.status(200).json(post)
    }

    async deletePost(req, res) {
        await Post.findByIdAndDelete(req.params.id)
        return res.status(200).json("o'chirildi")
    }

    async likePost(req, res, next) {
        const post = await Post.findById(req.params.id)
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } })
            return res.status(200).json("bu videoni yoqtirdingiz")
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } })
            return res.status(200).json("bu siz likeni olib tashladingiz")
        }
    }
}

export default new PostController
