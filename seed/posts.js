const db = require('../db')
const Post = require('../models/post')
const Author = require('../models/author')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const authors = await Author.find()

    if (authors.length === 0) {
        console.log('No authors found. Please seed authors first.');
        return;
    }

    const posts = [
        {
            title: 'The Healing Power of Aloe Vera',
            date: new Date('2024-01-12'),
            image: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Aloe_vera_flower_inset.png', 
            content: 'Aloe vera is a succulent plant species of the genus Aloe. It originates from the Arabian Peninsula, but grows wild in tropical, semi-tropical, and arid climates around the world.',
            author: authors[0]._id 
        },
        {
            title: 'The Resilience of the Snake Plant',
            date: new Date('2024-02-10'),
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg/2560px-Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg', // Updated to use 'image'
            content: 'Sansevieria trifasciata is commonly known as the snake plant. It is native to tropical West Africa and is known for its resilience and air-purifying qualities.',
            author: authors[1]._id 
        },
        {
            title: 'Growing Areca Palms Indoors',
            date: new Date('2024-03-15'),
            image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Dypsis_lutescens1.jpg/1280px-Dypsis_lutescens1.jpg', // Updated to use 'image'
            content: 'Dypsis lutescens, also known as areca palm, is a popular houseplant. It thrives in indirect sunlight and is known for its air-purifying abilities.',
            author: authors[0]._id 
        }
    ]


    await Post.insertMany(posts)
    console.log("Created some blog posts!")
}

const run = async () => {
    await main()
    db.close()
}

run()
