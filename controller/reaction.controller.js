const {reactionService} = require('../services')

exports.savePostReactions = async (req, res) => {
    try{
        const response = await reactionService.savePostReaction(req);
        console.log('response', response);
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
        if(response === 401){
            return res.status(202).json({message: 'Unauthorized user'})
        }
        else{
            return res.status(200).json(response)
        }
        
    }
    catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.removeReaction = async (req, res) => {
    try{
        const response = await reactionService.removeReaction(req)
            return res.status(202).json({message: 'removed successfully' , response})
        
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.deleteReactions = async (req, res) => {
    try{
        const response = await reactionService.deleteReactions(req)
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}