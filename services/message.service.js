const Message = require('../models/messages')

exports.createMessages = async (roomId, senderId, content) => {
    try {
        console.log(roomId, " ", senderId, " ", content)
        const message = new Message({
            room: roomId,
            sender: senderId,
            content: content
        })
        await message.save()
        return message.populate("sender", 'name')

    }
    catch (err) {
        console.log(err)
        throw err
    }

}

exports.fetchMessages = async (req) => {
    try {
        // const userId = req.id
        const {roomId}  = req.params
        const message = await Message.find({ room: roomId }).sort({createdAt: 1}).populate("sender", "name")
        return message
    } catch (err) {
        console.log(err)
        throw err
    }
}