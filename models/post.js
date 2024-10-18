const mongoose = require('mongoose')
const { Schema } = mongoose

const PostSchema = new Schema(
    {
        title: { type: String, required: true },
        date: { type: Date, required: true },
        image: { type: String, required: true },
        content: { type: String, required: true },
        author: { type: Schema.Types.ObjectId, ref: 'Author', required: true },
        comments: [{ type: Schema.Types.ObjectId, ref: 'Comment' }] 
    },
    { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema)
