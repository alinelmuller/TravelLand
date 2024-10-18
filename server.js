const express = require('express')
const db = require('./db')
const postController = require('./controllers/postController')
const bodyParser = require('body-parser')
const logger = require('morgan')



// require() imports and middleware here ^ ///////

const PORT = process.env.PORT || 3001;

const app = express();

// app.use() middleware here ^ ///////////////////
app.use(logger('dev'))
app.use(bodyParser.json())
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`))


app.get('/', (req, res) => res.send('This is our landing page!'))

app.get('/posts', postController.getAllPosts)
app.get('/posts/:id', postController.getPostById)
app.post('/posts', postController.createPost)
app.put('/posts/:id', postController.updatePost)
app.delete('/posts/:id', postController.deletePost)
