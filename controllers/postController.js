const Post = require('../models/post')

const getAllPosts = async (req, res) => {
    try {
      const posts = await Post.find();
      console.log(posts);  // Check if posts are being retrieved correctly
      res.json(posts);
    } catch (error) {
      res.status(500).send('Error retrieving posts');
    }
  };

const getPostById = async (req, res) => {
    try {
        const { id } = req.params
        const post = await Post.findById(id)
        if (post) {
            return res.json(post)
        }
        return res.status(404).send(`that post doesn't exist`)
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).send(`That post doesn't exist`)
        }
        return res.status(500).send(error.message);
    }
}

//Create Post
const createPost = async (req, res) => {
    try {
        const post = await new Post(req.body)
        await post.save()
        return res.status(201).json({ post});
    } catch (error) {
        return res.status(500).json({ error: error.message })
    }
}

//Update Post
const updatePost = async (req, res) => {
    try {
        let { id } = req.params;
        let post = await Post.findByIdAndUpdate(id, req.body, { new: true })
        if (post) {
            return res.status(200).json(post)
        }
        throw new Error("Post not found")
    } catch (error) {
        return res.status(500).send(error.message);
    }
}

//Delete Post
const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Post.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).send("Post deleted");
        }
        throw new Error("Post not found");
    } catch (error) {
        return res.status(500).send(error.message);
    }
}



module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}