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
          title: 'Exploring the Alps',
          date: new Date('2024-01-12'),
          image: 'https://example.com/images/alps.jpg',
          content: 'The Alps are a beautiful mountain range in Europe. The journey through the valleys was breathtaking, with towering peaks and lush green meadows. I hiked through charming villages and tasted local cheeses that were simply divine. One of the highlights was witnessing the sunrise over the snow-capped mountains, casting a golden glow across the landscape. If you love nature and adventure, the Alps should be on your bucket list!',
          author: authors[0]._id,
          comments: [],
        },
        {
          title: 'Sunset at Santorini',
          date: new Date('2024-01-12'),
          image: 'https://example.com/images/santorini.jpg',
          content: 'Santorini is known for its stunning sunsets that paint the sky with hues of orange, pink, and purple. Watching the sunset from Oia is simply magical, as the sun dips below the horizon and the village lights begin to twinkle. I spent my days exploring the island’s ancient ruins and relaxing on the unique black sand beaches. The local cuisine, especially the fresh seafood and traditional moussaka, added to the experience. Santorini truly feels like a dream!',
          author: authors[0]._id,
          comments: [],
        },
        {
          title: 'Adventures in the Amazon Rainforest',
          date: new Date('2024-01-12'),
          image: 'https://example.com/images/amazon.jpg',
          content: 'Exploring the Amazon rainforest is a once-in-a-lifetime experience. The sheer biodiversity is incredible, with countless species of plants, birds, and animals. I took guided hikes and boat rides, discovering hidden waterfalls and learning about indigenous cultures. At night, the rainforest comes alive with the sounds of wildlife, and I was lucky enough to spot a sloth and colorful macaws during my adventure. This trip opened my eyes to the importance of conservation and the beauty of our planet’s ecosystems.',
          author: authors[0]._id,
          comments: [],
        },
        {
          title: 'Backpacking Through Patagonia',
          date: new Date('2024-02-18'),
          image: 'https://example.com/images/patagonia.jpg',
          content: 'Patagonia offers some of the world’s most stunning natural landscapes. Hiking through its jagged peaks and glaciers was unforgettable, with every turn revealing breathtaking views. I trekked through Torres del Paine National Park, where I encountered vibrant blue lakes and rugged mountains. The local wildlife, including guanacos and Andean condors, added to the experience. Camping under the stars in this remote region made me appreciate the beauty and serenity of nature like never before.',
          author: authors[1]._id,
          comments: [],
        },
        {
          title: 'Cultural Immersion in Kyoto',
          date: new Date('2024-03-05'),
          image: 'https://example.com/images/kyoto.jpg',
          content: 'Kyoto’s temples and gardens provide a serene escape into Japan’s history and culture. I visited Kinkaku-ji, the Golden Pavilion, and marveled at its reflection in the surrounding pond. Strolling through the Arashiyama Bamboo Grove felt like stepping into another world. I also participated in a traditional tea ceremony, learning about the meticulous process and its significance in Japanese culture. Kyoto’s charm lies not only in its sights but also in the rich cultural experiences it offers.',
          author: authors[1]._id,
          comments: [],
        },
        {
          title: 'Safari in Serengeti National Park',
          date: new Date('2024-03-21'),
          image: 'https://example.com/images/serengeti.jpg',
          content: 'The Great Migration in Serengeti is one of the most awe-inspiring natural events on Earth. Seeing the wildebeest and zebras crossing the plains was a sight I will never forget. I joined a safari tour and had the chance to spot lions, elephants, and giraffes in their natural habitat. The knowledgeable guides shared insights about the ecosystem and conservation efforts. This experience deepened my appreciation for wildlife and the importance of preserving these majestic creatures.',
          author: authors[2]._id,
          comments: [],
        },
        {
          title: 'The Magic of Machu Picchu',
          date: new Date('2024-04-02'),
          image: 'https://example.com/images/machu_picchu.jpg',
          content: 'Machu Picchu is a marvel of Inca engineering and a UNESCO World Heritage site. Trekking the Inca Trail was the highlight of my journey, leading me through stunning landscapes and ancient ruins. Arriving at Machu Picchu at sunrise, surrounded by mist and mountains, was an unforgettable moment. I learned about the rich history of the Incas and explored the intricacies of this ancient site. Machu Picchu truly embodies the spirit of adventure and discovery.',
          author: authors[2]._id,
          comments: [],
        },
        {
          title: 'Diving in the Great Barrier Reef',
          date: new Date('2024-05-10'),
          image: 'https://example.com/images/great_barrier_reef.jpg',
          content: 'Diving in the Great Barrier Reef offers a glimpse into the vibrant underwater world. I was amazed by the colorful corals and diverse marine life, including turtles and reef sharks. Swimming alongside schools of fish in crystal-clear waters felt like being in an aquarium. The Great Barrier Reef is not only a stunning destination but also a critical ecosystem that needs our protection. This experience ignited my passion for marine conservation and exploring the wonders of the ocean.',
          author: authors[2]._id,
          comments: [],
        },
        {
          title: 'Road Trip Along the Pacific Coast Highway',
          date: new Date('2024-06-15'),
          image: 'https://example.com/images/pacific_coast_highway.jpg',
          content: 'Driving the Pacific Coast Highway offers stunning coastal views, from the dramatic cliffs of Big Sur to the beaches of Southern California. Each stop along the way revealed hidden gems, such as quaint seaside towns and breathtaking viewpoints. I explored the iconic Hearst Castle and enjoyed fresh seafood in local restaurants. The sunsets along the coast were simply magical, making this road trip one of my favorite adventures. There’s something special about the freedom of the open road!',
          author: authors[1]._id,
          comments: [],
        },
        {
          title: `Discovering Iceland’s Golden Circle`,
          date: new Date('2024-07-20'),
          image: 'https://example.com/images/iceland_golden_circle.jpg',
          content: 'Iceland’s Golden Circle is a mesmerizing tour of waterfalls, geysers, and volcanic landscapes. I stood in awe of the powerful Gullfoss waterfall and watched the Strokkur geyser erupt every few minutes. The contrasting landscapes, from lush green fields to barren lava fields, showcased Iceland’s unique beauty. I also visited the historic Þingvellir National Park, where the tectonic plates of North America and Eurasia meet. This trip was a reminder of the earth’s incredible forces and the beauty of nature.',
          author: authors[0]._id,
          comments: [],
        }
      ];
      
    await Post.deleteMany()
    await Post.insertMany(posts)
    console.log("Created some blog posts!")
}

const run = async () => {
    await main()
    db.close()
}

run()
