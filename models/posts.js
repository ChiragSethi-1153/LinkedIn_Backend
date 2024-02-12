const mongoose = require('mongoose')
const {ObjectId } = require('mongodb')

const postSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref:"users"
        // required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    images: {
        type: [String],
        default:null
    }
})

exports.Posts = mongoose.model('posts', postSchema)