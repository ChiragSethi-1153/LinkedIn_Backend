const mongoose = require('mongoose')
const Users = require('./users')

const roomSchema = new mongoose.Schema({
    participants: {
        type: Array,
        participant: {
            type: mongoose.Schema.Types.ObjectId,
            ref: Users
        }
    }
}, {timestamps: true})

exports.Room = mongoose.model('rooms', roomSchema)