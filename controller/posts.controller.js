const {postsService} = require('../services')


exports.createPosts = async (req, res) => {
    try{
    const response = await postsService.createPosts(req)
    return res.status(201).json(response)
    }
    catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.getAllPosts = async (req, res) => {
    try{
        const response  = await postsService.getAllPost();
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        return res.status(404).send(err)
    }
}


exports.getPost = async (req, res) => {
    try{
        const response = await postsService.getPost(req)
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        return res.status(404).send(err)
    }
}

exports.updatePost = async (req, res) => {
    try{
        const response  = await postsService.updatePost(req)
        return res.status(200).json(response)
    }
    catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}

exports.deletePosts = async (req, res) => {
    try{
        const response = await postsService.deletePosts(req)
        return res.status(202).json(response)
    }
    catch(err){
        console.log(err)
        return res.status(400).json(err)
    }
}