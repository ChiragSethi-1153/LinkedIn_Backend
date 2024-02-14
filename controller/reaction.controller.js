const {reactionService} = require('../services')

exports.savePostReactions = async (req, res) => {
    try{
        const response = await reactionService.savePostReaction(req)
        
        return res.status(201).json({response})
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.getPostReactions = async (req, res) => {
    try{
        const response = await reactionService.getPostReactions(req)
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}


exports.saveCommentReactions = async (req, res) => {
    try{
        const response = await reactionService.saveCommentReaction(req)
        
        return res.status(201).json({response})
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.getCommentReactions = async (req, res) => {
    try{
        const response = await reactionService.getCommentReactions()
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}


exports.updateReaction = async (req, res) => {
    try{
        const response = await reactionService.updateReaction(req)
        return res.status(202).json(response)
    }
    catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.removeReaction = async (req, res) => {
    try{
        const response = await reactionService.removeReaction(req)
        return res.status(202).json(response)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}