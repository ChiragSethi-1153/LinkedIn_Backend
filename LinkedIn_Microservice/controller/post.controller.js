const { postService } = require("../services")


exports.NotifyNewPost = async (req, res) => {
    try{
        const response = await postService.notifyNewPost(req)
        return res.status(201).json(response) 
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.getAllNotifications = async (req, res) => {
    try{
        const response = await postService.getAllNotifications(req)
        return res.status(200).json(response) 
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.createNotification = async(req, res) => {
    try{
        const response = await postService.createNotification(req)
        return res.status(201).json(response)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}