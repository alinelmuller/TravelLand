const db = require('../db')
const Author = require('../models/author')

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

const main = async () => {
    const authors = [
        {
            name: 'Jane Doe',
            bio: 'Jane is a passionate plant enthusiast and writer with a love for all things green. She enjoys sharing her knowledge on botanical care and sustainable gardening.',
            avatar_url: 'https://example.com/jane.jpg'
        },
        {
            name: 'John Smith',
            bio: 'John is a professional gardener and author who has spent years studying tropical plants. His writing covers plant care, soil management, and environmental conservation.',
            avatar_url: 'https://example.com/john.jpg'
        },
        {
            name: 'Emily Green',
            bio: 'Emily is a botanist and environmentalist, dedicated to educating people about plant species and their roles in ecosystems around the world.',
            avatar_url: 'https://example.com/emily.jpg'
        }
    ]
    await Author.deleteMany()
    await Author.insertMany(authors)
    console.log('Created some authors!')
}

const run = async () => {
    await main()
    db.close()
}

run()
