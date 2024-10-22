const Author = require('../models/author')

// Get All Authors
const getAllAuthors = async (req, res) => {
    try {
        const authors = await Author.find()
        res.json({ status: 'success', data: authors })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message })
    }
}

// Get Author by ID
const getAuthorById = async (req, res) => {
    try {
        const { id } = req.params
        const author = await Author.findById(id)
        if (author) {
            return res.json({ status: 'success', data: author })
        }
        return res.status(404).json({ status: 'error', message: "That author doesn't exist" })
    } catch (error) {
        if (error.name === 'CastError' && error.kind === 'ObjectId') {
            return res.status(404).json({ status: 'error', message: "That author doesn't exist" })
        }
        return res.status(500).json({ status: 'error', message: error.message })
    }
}

// Create Author
const createAuthor = async (req, res) => {
    try {
        const author = await new Author(req.body)
        await author.save()
        return res.status(201).json({ status: 'success', data: author })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message })
    }
}

// Update Author
const updateAuthor = async (req, res) => {
    try {
        const { id } = req.params
        const author = await Author.findByIdAndUpdate(id, req.body, { new: true })
        if (author) {
            return res.status(200).json({ status: 'success', data: author })
        }
        return res.status(404).json({ status: 'error', message: "Author not found" })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message })
    }
}

// Delete Author
const deleteAuthor = async (req, res) => {
    try {
        const { id } = req.params
        const deleted = await Author.findByIdAndDelete(id)
        if (deleted) {
            return res.status(200).json({ status: 'success', message: "Author deleted" })
        }
        return res.status(404).json({ status: 'error', message: "Author not found" })
    } catch (error) {
        return res.status(500).json({ status: 'error', message: error.message })
    }
}

module.exports = {
    getAllAuthors,
    getAuthorById,
    createAuthor,
    updateAuthor,
    deleteAuthor
}
