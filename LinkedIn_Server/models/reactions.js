
/*
_id: rcc1
user_id: reaction dene wala
text: "abc"
*/
const mongoose = require('mongoose')
const Users = require('./users')
const { Posts } = require('./posts')
const { Comments } = require('./comments')

const reactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: Users
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Posts
    },
    commentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Comments 
    },
    emoji: {
        type: String,
        enum: ['Like','Celebrate', 'Support', 'Love', 'Insightful', 'Funny'],
    }
}, { timestamps: true })

exports.Reactions = mongoose.model('reactions', reactionSchema)