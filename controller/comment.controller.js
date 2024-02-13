const {commentService} = require('../services')

exports.postComment = async (req, res) => {
    try{
        const response = await commentService.postComment(req)
        return res.status(201).json(response)
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}

exports.getAllComments = async (req, res) => {
    try{
        const response = await commentService.getAllComments(req)
        return res.status(200).json(response)
    }
    catch(err) {
        console.log(err)
        return res.status(400).send(err)
    }
}

exports.editComment = async (req, res) => {
    try{
        const response = await commentService.editComments(req)
        if(response == "Unauthorized User"){
            return res.status(400).json(response)
        }
        else {
            return res.status(202).json(response)
        }

    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}

exports.deleteComment = async (req, res) => {
    try{
        const response = await commentService.deleteComment(req)
        return res.status(202).json({message: "deleted successfully", response})
    }catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
}