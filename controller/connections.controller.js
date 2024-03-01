const {connectionService} = require('../services')


exports.newConnection = async (req, res) => {
    try{
        const response = await connectionService.newConnection(req)
        return res.status(201).json({message:'request for connection' , response})
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.getConnectionTo = async (req, res) => {
    try{
        const response = await connectionService.getConnectionTo(req)
        if(response ===  204){
            return res.status(204)
        }
        else {
            return res.status(200).json({message: 'connection requests found', response})
        }
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.getConnectionBy = async (req, res) => {
    try{
        const response = await connectionService.getConnectionBy(req)
        if(response === 204){
            return res.status(204)
        }
    else {
        return res.status(200).json({message: 'connection requests found', response})
    }
}catch(err){
    console.log(err)
    return res.status(500).send(err)
}
}



exports.getAllConnections = async (req, res) => {
    try{
        const response = await connectionService.getAllConnections(req)

        if(response === 204){
            return res.status(204)
        }
    else {
        return res.status(200).json({message: 'All Connections', response})
    }
}catch(err){
    console.log(err)
    return res.status(500).send(err)
}
    }

exports.editConnectionStatus = async (req, res) => {
    try{
        const response = await connectionService.editConnectionStatus(req)
        return res.status(200).json({message: 'Status changes Succesfully', response})
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.getSuggestions = async (req, res) => {
    try{
        const response = await connectionService.getSuggestions(req)
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}