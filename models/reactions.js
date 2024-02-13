
/*
_id: rcc1
user_id: reaction dene wala
text: "abc"
*/
const mongoose = require('mongoose')
const Users = require('./users')
const { Posts } = require('./posts')

const reactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId ,
        ref: Users
    },
    postId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Posts
    },
    emoji: {
        type: String,
        enum: ['Like','Celebrate', 'Support', 'Love', 'Insightful', 'Funny'],    
        default:'Like'
    }
})

exports.Reactions = mongoose.model('reactions', reactionSchema)