const Post = require('../models/post')

// Get All Posts
const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        return res.json({ status: 'success', data: posts });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Error retrieving posts' });
    }
};

// Get Post by ID
const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findById(id);
        if (post) {
            return res.json({ status: 'success', data: post });
        }
        return res.status(404).json({ status: 'error', message: "That post doesn't exist" });
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).json({ status: 'error', message: "That post doesn't exist" });
        }
        return res.status(500).json({ status: 'error', message: error.message });
    }
};

// Create Post
const createPost = async (req, res) => {
    try {
        const newPost = new Post(req.body);
        await newPost.save();
        return res.status(201).json({ status: 'success', data: newPost });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: 'Error creating post' });
    }
};

// Update Post
const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
        if (post) {
            return res.status(200).json({ status: 'success', data: post });
        }
        return res.status(404).json({ status: 'error', message: "Post not found" });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
};

// Delete Post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Post.findByIdAndDelete(id);
        if (deleted) {
            return res.status(200).json({ status: 'success', message: 'Post deleted', data: deleted });
        }
        return res.status(404).json({ status: 'error', message: "Post not found" });
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message });
    }
};

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
};
