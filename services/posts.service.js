const { Posts } = require("../models/posts")
const multer = require('multer')
// const path = require('path')

exports.createPosts = async(req) => {
    const {userId} = req.params;
    const { title, body} = req.body
    console.log(req.body)
    const newImages = req.files.images.map((i) => {return i.path})
    console.log(newImages)

    const post = new Posts({
        userId: userId,
        title,
        body,
        images: newImages
    })

    try{
        await post.save()
        return post
    }
    catch(err){
        console.log(err)
    }
} 

exports.getAllPost = async () => {

    try{
        const post = await Posts.find()
        return post
    }catch(err)
    {
        console.log(err)
    }


}

exports.getPost = async (req) => {

    const {id} = req.params 
    try{
        const post = Posts.findOne({userId: id})
        return post
    }catch(err)
    {
        console.log(err)
    }


}

exports.updatePost = async (req) => {
    const {id} = req.params
    const { body, title } = req.body;
    // console.log(req.body)
    try{
        const updated = await Posts.findByIdAndUpdate(id, {title, body}, {new: true})
        console.log(updated)
        return updated;
    }catch(err){ 
        console.log(err)
    }
}

exports.deletePosts = async (req) => {
    const {id} = req.params
    try{
        const deleted = await Posts.findByIdAndDelete(id)
        return deleted
    }catch(err){
        console.log(err)
    }
}