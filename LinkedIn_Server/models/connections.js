const mongoose = require('mongoose')
const Users = require('./users')

const connectionSchema = new mongoose.Schema({
    status: {
        type: String,
        enum: ['accepted', 'pending', 'rejected', 'deleted', 'withdraw'],
        default: 'pending'
    },
    connectionTo: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users
    },
    connectionBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Users
    }

}, {timestamps: true})

const Connections = mongoose.model('connections' , connectionSchema)
module.exports = Connections