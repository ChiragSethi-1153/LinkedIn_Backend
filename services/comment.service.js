const {Comments} = require('../models/comments')
const db = require('mongoose');


exports.postComment = async (req) => {
    try{
    const userId = req.id
    const {postId} = req.params;
    const {body} = req.body

        const comment = new Comments({
            userId,             
            postId: postId,
            body,
        })
        await comment.save()
        return comment
    }
    catch(err){
        console.log(err)
        return err
    }
}

exports.getAllComments = async (req) => {
    try{
        const comments = await Comments.find().sort({createdAt: -1}).limit(3);
        return comments
    }catch(err)
    {
        console.log(err)
        return err
    }
}


exports.editComments = async (req) => {
    try{
        const {userId} = req.id
    const {commentId} = req.params
    const { body} = req.body
    const currentUserId = await Comments.findById(commentId)

  
        if(userId === currentUserId.userId ){
            const edit = await Comments.findByIdAndUpdate(commentId, {body}, {new: true})
            return edit
        }   
        else {
            return 401
        }
    }
    catch(err){
        console.log(err)
        return err
    }
}

exports.deleteComment = async (req) => {
   
    try{
    // const session = await db.startSession();
    // session.startTransaction()
    const {commentId} = req.params
    const {userId} = req.id
    const currentUserId = await Comments.findById(commentId)
    
    // const delReaction = await Reactions.findByIdAndDelete[(commentId), {session: session}]
    
        if(userId === currentUserId.userId ){
            
            const del = await Comments.findByIdAndDelete(commentId)
            return del
        }   
        else {
            return 401
        }
    }
    catch(err){
        console.log(err)
        return err
    }
}