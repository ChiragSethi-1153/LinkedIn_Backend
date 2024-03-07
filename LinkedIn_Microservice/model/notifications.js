const mongoose = require('mongoose')
// const Users = require('../../LinkedIn_Server/models/users')

const notificationSchema = new mongoose.Schema({
    reciever: {
        type: mongoose.Schema.Types.ObjectId
    },
    sender: {
        type: mongoose.Schema.Types.ObjectId
    },
    content: {
        type: String
    },
    notificationType: {
        type: String,
        enum: ['post', 'comment', 'reaction', 'connection' ]
    }
}, {timestamps: true})

const Notifications = mongoose.model('notifications', notificationSchema)
module.exports = Notifications