const db = require('../db')
const Comment = require('../models/comment')
const Author = require('../models/author')
const Post = require('../models/post')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const authors = await Author.find()
    const posts = await Post.find()

    const comments = [
        {
            content: 'Great post about plants!',
            author: authors[0]._id,
            post: posts[0]._id
        },
        {
            content: 'I learned a lot from this post, thanks!',
            author: authors[1]._id,
            post: posts[1]._id
        }
    ]

    await Comment.insertMany(comments)
    console.log('Created some comments!')
}

const run = async () => {
    await main()
    db.close()
}

run()
