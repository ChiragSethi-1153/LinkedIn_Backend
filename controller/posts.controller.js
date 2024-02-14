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
        if(response == null ){
            return res.status(404).json({message: 'No Post Found', response})
        }else{
            return res.status(200).json({response})
        }
        
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}


exports.getPost = async (req, res) => {
    try{
        const response = await postsService.getPost(req)
        if(response == null) {
            return res.status(404).json({message: 'No Post Found', response})
        }
        else{
            return res.status(200).json(response)
        }
        
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.updatePost = async (req, res) => {
    try{
        const response  = await postsService.updatePost(req)
        if(response == null) {
            return res.status(404).json({message: 'No Post Found', response})
        }
        else if(response == "Not Authorized"){
            return res.status(401).json(response)
        }
        else{
            return res.status(201).json(response)
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.deletePosts = async (req, res) => {
    try{
        const response = await postsService.deletePosts(req)
        if(response == null) {
            return res.status(404).json({message: 'No Post Found', response})
        }
        else if(response == "Not Authorized"){
            return res.status(401).json(response)
        }
        else{
            return res.status(200).json({message: "deleted Successfully", response})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).json(err)
    }
}