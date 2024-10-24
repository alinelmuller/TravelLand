const db = require('../db')
const Comment = require('../models/comment')
const Post = require('../models/post')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {

    const posts = await Post.find()

    const comments = [
        {
            content: 'Great post about plants!',
            name: 'Aline',  
            post: `671948b9d555db41237991df`
        },
        {
            content: 'I learned a lot from this post, thanks!',
            name: 'Ashley',  
            post: `671948b9d555db41237991df`
        },
        {
            content: 'Awsome!',
            name: 'Jeremy',  
            post: `671948b9d555db41237991df`
        },
        {
            content: 'Thank you for sharing',
            name: 'Molly',  
            post: `671948b9d555db41237991df`
        },
    ];
    await Comment.deleteMany()
    await Comment.insertMany(comments)
    console.log('Created some comments!')
}

const run = async () => {
    await main()
    db.close()
}

run()
