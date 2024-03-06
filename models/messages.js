const mongoose = require('mongoose')
const Users = require('./users')
const { Room } = require('./room')

const messageSchema = new mongoose.Schema({
    room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Room,
        required: true
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users,
        required: true
    },
    content: {
        type: String,
        required: true
    }
}, {timestamps: true})


const Message = mongoose.model('messages', messageSchema)
module.exports = Message