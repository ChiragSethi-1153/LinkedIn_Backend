const Connections = require("../models/connections")
const Users = require("../models/users")
const axios = require('axios')

exports.newConnection = async (req) => {
    try{ 
        const userId = req.id
        const {Id} = req.body
        // const {status} = req.body
        const currStatus = await Connections.find({"or": [{connectionBy: userId, connectionTo: Id}, {connectionBy: Id, connectionTo: userId}]})
        console.log(currStatus)
        if(currStatus.length > 0 ){
            return currStatus
        }
        else{ 
            const connect = await new Connections({
                connectionBy: userId,
                connectionTo: Id,
            }).populate('connectionBy', 'name headline')
            console.log(connect)
            await connect.save()

            const notificationData = {sender: connect.connectionBy, reciever: connect.connectionTo, type: 'connection'}
            console.log(notificationData)
    
            const commentNotification = await axios.post(`${process.env.NOTIFICATIONS_URL}/notification`, notificationData)
            console.log(commentNotification.data)

            return connect
        }

    }catch(err){
        console.log(err)
        return err 
    }
    }


exports.getConnectionTo = async (req) => {
    try{
        const userId = req.id
        // const {status} = req.body
        const pending = await Connections.find({status: 'pending', connectionTo: userId})
        .sort({createdAt: -1})
        .populate('connectionBy', "name company headline")
        
        if(pending.length === 0){
            // console.log(pending)
            return 204
        }
        else{
            console.log(pending)
            return pending
        } 
    }catch(err){
        console.log(err)
        return err
    }
}

exports.getConnectionBy = async (req) => {
    try{
        const userId = req.id
        // const {status} = req.body
        const pending = await Connections.find({status: 'pending', connectionBy: userId})
        .sort({createdAt: -1})
        .populate('connectionTo', "name company headline")
        if(pending.length === 0){
            return 204
        }
        else{
            // console.log(pending)
            return pending
        }
    }catch(err){
        console.log(err)
        return err
    }
}

exports.getAllConnections = async (req) => {
    try{
        const userId = req.id
        // const {status} = req.body
        const connections = await Connections.find({status: 'accepted', $or: [ { connectionBy: userId }, { connectionTo: userId } ] })
        const total = connections.length
        if(connections.length === 0){
            return 204
        }
        else{
            return {connections, total}
        }
    }catch(err){
        console.log(err)
        return err
    }
}

exports.editConnectionStatus = async (req) => {
    try{
        const userId  = req.id
        const {Id, status} =req.body
        
        console.log(status)
        if(status === 'accepted' || status === 'rejected'){
            const newStatus = await Connections.findOneAndUpdate({"$and": [{connectionTo: userId},{connectionBy: Id}]}, {status: status}, {new: true})
            return newStatus
        }
        else if(status === 'withdraw'){
            const newStatus = await Connections.findOneAndUpdate({"$and": [{connectionTo: Id},{connectionBy: userId}]}, {status: status}, {new: true})
            return newStatus
        }
        
    }catch(err){
        console.log(err)
        return err
    }
}

exports.getSuggestions = async (req) => {
    try{ 
        const userId = req.id
        const response = await Connections.find({"$or": [{connectionBy: userId}, {connectionTo: userId}]})
        // console.log(response)
        const users = response.map((i) => i.connectionBy == userId ? i.connectionTo : i.connectionBy)
        
        users.push(userId)
        // console.log(users)
        const suggestions = await Users.find({_id: {$nin: users}}, "-password")
        if(!suggestions){
            return 404
        }
        return suggestions
    }catch(err){
        console.log(err)
        return err
    }
}