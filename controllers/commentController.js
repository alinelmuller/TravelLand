const Comment = require('../models/comment')
const Post = require('../models/post')

// Get All Comments for a Post
const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const comments = await Comment.find({ post: postId });  
        res.status(200).json({ status: 'success', data: comments });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Error fetching comments' });
    }
};

// Create a Comment
const createComment = async (req, res) => {
    try {
        const { postId } = req.params;
        const { content, name } = req.body;

        if (!content || !name) {
            return res.status(400).json({ status: 'error', message: 'Name and content are required' });
        }

        // Verify if the post exists
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ status: 'error', message: 'Post not found' });
        }

        const comment = new Comment({
            content,
            name,
            post: postId
        });

        await comment.save();

        post.comments.push(comment._id);
        await post.save();

        res.status(201).json({ status: 'success', data: comment });
    } catch (error) {
        console.error(error); // Log full error for debugging
        res.status(500).json({ status: 'error', message: 'Error creating comment' });
    }
};

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
