const express = require('express')
const db = require('./db')
const postController = require('./controllers/postController')
const authorController = require('./controllers/authorController') // Import author controller
const bodyParser = require('body-parser')
const logger = require('morgan')

// Require() imports and middleware here ^ ///////

const PORT = process.env.PORT || 3001;

const app = express();

// app.use() middleware here ^ ///////////////////
app.use(logger('dev'))
app.use(bodyParser.json())

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))

app.get('/', (req, res) => res.send('This is our landing page!'))

// Post Routes
app.get('/posts', postController.getAllPosts)
app.get('/posts/:id', postController.getPostById)
app.post('/posts', postController.createPost)
app.put('/posts/:id', postController.updatePost)
app.delete('/posts/:id', postController.deletePost)

// Author Routes
app.get('/authors', authorController.getAllAuthors)
app.get('/authors/:id', authorController.getAuthorById)
app.post('/authors', authorController.createAuthor)
app.put('/authors/:id', authorController.updateAuthor)
app.delete('/authors/:id', authorController.deleteAuthor)
