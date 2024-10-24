const express = require('express');
const db = require('./db'); 
const postController = require('./controllers/postController');
const authorController = require('./controllers/authorController');
const commentController = require('./controllers/commentController'); 
const logger = require('morgan');
const cors = require('cors');
const path = require('path');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));
app.use(cors());
app.use(express.json()); 

// Serve static files from the client directory
app.use(express.static(path.join(__dirname, 'client')));

// Landing Page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html')); // Adjust the path as necessary
});

// Post Routes
app.get('/posts', postController.getAllPosts);
app.get('/posts/:id', postController.getPostById);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

// Author Routes
app.get('/authors', authorController.getAllAuthors);
app.get('/authors/:id', authorController.getAuthorById);
app.post('/authors', authorController.createAuthor);
app.put('/authors/:id', authorController.updateAuthor);
app.delete('/authors/:id', authorController.deleteAuthor);

// Comment Routes
app.get('/posts/:postId/comments', commentController.getCommentsByPostId); 
app.post('/posts/:postId/comments', commentController.createComment);     
app.delete('/comments/:id', commentController.deleteComment);             


app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ status: 'error', message: 'Internal Server Error' });
});

// Start the server
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
