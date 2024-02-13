const {reactionService} = require('../services')

exports.saveReactions = async (req, res) => {
    console.log("wcwe")
    try{
        const response = await reactionService.saveReaction(req)
        
        return res.status(201).json({response})
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}

exports.getReactions = async (req, res) => {
    try{
        const response = await reactionService.getReactions()
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}

exports.updateReaction = async (req, res) => {
    try{
        const response = await reactionService.updateReaction(req)
        return res.status(202).json(response)
    }
    catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}

exports.removeReaction = async (req, res) => {
    try{
        const response = await reactionService.removeReaction(req)
        return res.status(202).json(response)
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}