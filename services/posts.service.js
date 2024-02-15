const { Posts } = require("../models/posts")
const multer = require('multer');
const { findById } = require("../models/users");
// const path = require('path')

exports.createPosts = async(req) => {
    try{
    const {userId} = req.id;
    const { title, body} = req.body
    // console.log(req.body)
    let newImages
    if(req.files.images !== null){
         newImages = req.files.images.map((i) => {return i.path})     
        // console.log(newImages)
    }
    const post = new Posts({
        userId: userId,
        title,
        body,
        images: newImages
    })
  
        await post.save()
        return post
    }
    catch(err){
        console.log(err)
        return err
    }
} 

exports.getAllPost = async () => {

    try{
        const posts = await Posts.find().sort({createdAt: -1}).limit(10)
        return posts
    }catch(err)
    {
        console.log(err)
        return err
    }
}

// Need to be updated 
exports.getPost = async (req) => {
    try{
    const {userId} = req.body
    
        const post = Posts.find({userId: userId}).sort({createdAt: -1}).limit(10)
        return post
    }catch(err)
    {
        console.log(err)
        return err
    }
}

// verification needed
exports.updatePost = async (req) => {
    try{
        const {userId} = req.id
    const {postId} = req.params
    const { body, title } = req.body;
    // console.log(req.body)
    const currentUserId = await Posts.findById(postId)
    if(currentUserId.userId === userId){
        const updated = await Posts.findByIdAndUpdate(postId, {title, body}, {new: true})
        console.log(updated)
        return updated;
    }
        else{
            return 401
        }
        
    }catch(err){ 
        console.log(err)
        return err
    }
}

exports.deletePosts = async (req) => {
    try{
    const {postId} = req.params
    const { userId } = req.id;
    // console.log(req.body)
        const currentUserId = await Posts.findById(postId)
        if(currentUserId.userId == userId){
        const deleted = await Posts.findByIdAndDelete(postId)
        return deleted
        }
        else{
            return 401
        }
    }catch(err){
        console.log(err)
        return err
    }
}