const { connections } = require("mongoose")
const Notifications = require("../model/notifications")


exports.notifyNewPost = async (req) => {
    try{
        const {sender, type, connections} =req.body
        const content = `${sender} created a new Post`
        const notification = new Notifications({
            sender: senderId,
            notificationType: type,
            content,
            reciever: connections
        })


    }catch(err){

    }
}