const db = require('../db')
const Post = require('../models/post')

// Connect to the database
db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const posts = [
        {
            title: 'The Healing Power of Aloe Vera',
            date: new Date('2024-01-12'),
            img_url: 'https://upload.wikimedia.org/wikipedia/commons/4/4b/Aloe_vera_flower_inset.png',
            content: 'Aloe vera is a succulent plant species of the genus Aloe. It originates from the Arabian Peninsula, but grows wild in tropical, semi-tropical, and arid climates around the world.',
            author: '6510d567a4f6a1c3a7f910b1' // Example ObjectId for an author
        },
        {
            title: 'The Resilience of the Snake Plant',
            date: new Date('2024-02-10'),
            img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg/2560px-Snake_Plant_%28Sansevieria_trifasciata_%27Laurentii%27%29.jpg',
            content: 'Sansevieria trifasciata is commonly known as the snake plant. It is native to tropical West Africa and is known for its resilience and air-purifying qualities.',
            author: '6510d567a4f6a1c3a7f910b2'
        },
        {
            title: 'Growing Areca Palms Indoors',
            date: new Date('2024-03-15'),
            img_url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Dypsis_lutescens1.jpg/1280px-Dypsis_lutescens1.jpg',
            content: 'Dypsis lutescens, also known as areca palm, is a popular houseplant. It thrives in indirect sunlight and is known for its air-purifying abilities.',
            author: '6510d567a4f6a1c3a7f910b3'
        }
        // Add more posts as needed
    ]

    await Post.insertMany(posts)
    console.log("Created some blog posts!")
}

const run = async () => {
    await main()
    db.close()
}

run()
