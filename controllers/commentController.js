const Comment = require('../models/comment')
const Post = require('../models/post')

// Get All Comments for a Post
const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params
        const comments = await Comment.find({ post: postId }).populate('author')
        res.json({ status: 'success', data: comments })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message })
    }
}

// Create a Comment
const createComment = async (req, res) => {
    try {
        const { postId } = req.params
        const { content, author } = req.body

        if (!content || !author) {
            return res.status(400).json({ status: 'error', message: 'Content and author are required' })
        }

        const comment = await new Comment({
            content,
            author,
            post: postId
        })
        await comment.save()

        // Add comment to the related post
        await Post.findByIdAndUpdate(postId, { $push: { comments: comment._id } })

        return res.status(201).json({ status: 'success', data: comment })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message })
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
            return res.status(200).json({ status: 'success', message: 'Comment deleted', data: comment })
        }
        return res.status(404).json({ status: 'error', message: 'Comment not found' })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message })
    }
}

module.exports = {
    getCommentsByPostId,
    createComment,
    deleteComment
}
