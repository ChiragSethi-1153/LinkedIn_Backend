const {messageService} = require('../services')

exports.createMessage = async (req, res) => {
    try{
        const response = await messageService.createMessages(req)
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.fetchMessages = async (req, res) => {
    try{
        const response = await messageService.fetchMessages(req)
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}