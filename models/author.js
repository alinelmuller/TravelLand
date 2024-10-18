const mongoose = require('mongoose')
const { Schema } = mongoose

const AuthorSchema = new Schema(
    {
        name: { type: String, required: true },       // Author's name
        bio: { type: String, required: true },        // Short biography
        avatar_url: { type: String, required: false } // Optional URL for the author's avatar or profile picture
    },
    { timestamps: true } // Automatically adds createdAt and updatedAt fields
)

module.exports = mongoose.model('Author', AuthorSchema)
