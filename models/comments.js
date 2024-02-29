const mongoose = require('mongoose')
const Users = require('./users')

const {ObjectId } = require('mongodb')
const { Posts } = require('./posts')

const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        // require: [true]
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Posts 
    },
    
    body: {
        type: String,
        required: true
    }
    
}, { timestamps: true })

exports.Comments = mongoose.model('comments', commentSchema)
