const mongoose = require('mongoose')
const { Schema } = mongoose

const AuthorSchema = new Schema(
    {
        name: { type: String, required: true },       
        bio: { type: String, required: true },        
        avatar_url: { type: String, required: false } 
    },
    { timestamps: true } 
)

module.exports = mongoose.model('Author', AuthorSchema)
