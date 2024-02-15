const {commentService} = require('../services')

exports.postComment = async (req, res) => {
    try{
        const response = await commentService.postComment(req)
        return res.status(201).json(response)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.getAllComments = async (req, res) => {
    try{
        const response = await commentService.getAllComments(req)
        return res.status(200).json(response)
    }
    catch(err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.editComment = async (req, res) => {
    try{
        const {userId} = req.id
        const response = await commentService.editComments(req)
        if(response === 401){
            console.log(response)
            return res.status(401).json({message: "not Authorized"})
        }
        else {
            return res.status(200).json({message: 'Comment Edited Successfully', response})
        }

    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.deleteComment = async (req, res) => {
    try{
        const response = await commentService.deleteComment(req)
        if(response === 401){
            return res.status(400).json({message: "Unauthorized User"})
        }
        else {
            return res.status(200).json({message: "deleted successfully", response})
        }
        
    }catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}