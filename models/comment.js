const mongoose = require('mongoose')
const { Schema } = mongoose

const CommentSchema = new Schema(
    {
        content: { type: String, required: true },
        name: { type: String, required: true  },
        post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }, 
    },
    { timestamps: true }
)

module.exports = mongoose.model('Comment', CommentSchema)
