const mongoose = require('mongoose')
const Users = require('./users')
const {ObjectId } = require('mongodb')

const postSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        // require: [true]
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    images: {
        type: [String],
        default: null
    }
})

exports.Posts = mongoose.model('posts', postSchema)
