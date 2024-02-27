const Connections = require("../models/connections")


exports.newConnection = async (req) => {
    try{ 
        const userId = req.id
        const {Id} = req.params
        // const {status} = req.body
        const connect =  new Connections({
            connectionTo: Id,
            connectionBy: userId,
        })
    await connect.save()
    return connect

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
        if(pending.length === 0){
            return 404
        }
        else{
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
        const pending = await Connections.find({status: 'pending', connectionBy: userId}).populate('connectionTo', "name company headline")
        if(pending.length === 0){
            return 404
        }
        else{
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
            return 404
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
        const {Id} = req.params
        const {status} =req.body
        const newStatus = await Connections.findOneAndUpdate({"$and": [{connectionTo: userId},{connectionBy: Id}]}, {status: status})
        if(newStatus.length === 0){
            return 404
        }
        else{
            return newStatus
        }
    }catch(err){
        console.log(err)
        return err
    }
}