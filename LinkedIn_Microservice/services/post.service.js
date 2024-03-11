
const { handlePostNotifications } = require("../config/io.controller")
const Notifications = require("../model/notifications")


exports.notifyNewPost = async (req) => {
    try{      
        const {sender, reciever, type} = req.body
        // console.log(reciever)
        const content = `${sender.name} created a new Post`
        const notification = new Notifications({
            sender: sender,
            notificationType: type,
            content,
            reciever: reciever
        })
        notification.reciever?.map((i)=> (
        //    console.log(i)
            handlePostNotifications(i, content)
            
        )
        )
        await notification.save()
        console.log("object", notification)
        
        // handlePostNotifications(sender._id, content)
        
        return notification

    }catch(err){
        console.log(err)
        return err
    }
}


exports.getAllNotifications = async (req) => {
    try{
        const {userId} = req.params
        const notifications = await Notifications.find({ reciever: { $in: [userId] } }).sort({createdAt: -1})
        return notifications
    }catch(err){
        console.log(err)
        return err
    }
    
}


exports.createNotification = async (req) => {
    try{
        const {sender, reciever, type} = req.body
        console.log({sender, reciever, type})
        let content
        if(type === 'comment'){
            content = `${sender.name} wrote a comment on your post`
        }
        else if(type === 'reaction'){
            content = `${sender.name} reacted on your post`
        }
        else if(type === 'connection'){
            content = `${sender.name} sent you a connection request`
        }

        const notification = new Notifications({
            sender: sender,
            notificationType: type,
            content,
            reciever: reciever
        })
        console.log("notification", notification)
        await notification.save()

        notification.reciever?.map((i)=> (
            // console.log(i)
            handlePostNotifications(i, content)
        )
        )
        
        return notification

    }catch(err){
        console.log(err)
        return err
    }
}