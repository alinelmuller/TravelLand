const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema(
    {
        title: { type: String, required: true },           // Title of the blog post
        date: { type: Date, required: true },              // Date of the post
        img_url: { type: String, required: true },         // URL for the image
        content: { type: String, required: true },         // Main content of the post
        author: { type: Schema.Types.ObjectId, ref: 'Author', required: true } // Reference to the Author model
    },
    { timestamps: true } // Adds createdAt and updatedAt fields automatically
)

module.exports = mongoose.model('Post', PostSchema)