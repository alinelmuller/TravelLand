const Comment = require('../models/comment')
const Post = require('../models/post')

// Get All Comments for a Post
const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params
        const comments = await Comment.find({ post: postId }).populate('author')
        res.json(comments)
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

// Create a Comment
const createComment = async (req, res) => {
    try {
        const { postId } = req.params
        const comment = await new Comment({
            content: req.body.content,
            author: req.body.author,
            post: postId
        })
        await comment.save()

        // Add comment to the related post
        await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } })

        return res.status(201).json(comment)
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

// Delete a Comment
const deleteComment = async (req, res) => {
    try {
        const { id } = req.params
        const comment = await Comment.findByIdAndDelete(id)
        if (comment) {
            // Remove comment from the related post
            await Post.findByIdAndUpdate(comment.post, { $pull: { comments: id } })
            return res.status(200).send('Comment deleted')
        }
        return res.status(404).send('Comment not found')
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    getCommentsByPostId,
    createComment,
    deleteComment
}
