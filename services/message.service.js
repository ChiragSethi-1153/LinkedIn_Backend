const Messages = require('../models/messages')

exports.createMessages = async (req) => {
    try {
        const { roomId, senderId, content } = req.body
        const message = new Messages({
            room: roomId,
            sender: senderId,
            content: content
        })
        await message.save()
        return message

    }
    catch (err) {
        console.log(err)
        throw err
    }

}

exports.fetchMessages = async (req) => {
    try {
        const userId = req.id
        const { roomId } = req.body
        const message = await Messages.find({ room: roomId })
        return message
    } catch (err) {
        console.log(err)
        throw err
    }
}