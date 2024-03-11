const {Comments} = require('../models/comments')
const axios = require('axios');
const { Posts } = require('../models/posts')


exports.postComment = async (req) => {
    try{
    const userId = req.id
    // const {postId} = req.params
    const {postId, body} = req.body

        const comment = new Comments({
            userId,             
            postId,
            body,
        })
        await comment.save()
        const comm = await comment.populate("userId", "name headline")
        // console.log(comm)

        const post = await Posts.find({_id: postId})
        // console.log(post)

        const reciever = post.map((i) => i?.userId)
        // console.log(reciever)

        const notificationData = {sender: comm.userId, reciever: reciever, type: 'comment'}
        console.log(notificationData)

        const commentNotification = await axios.post(`${process.env.NOTIFICATIONS_URL}/notification`, notificationData)
        console.log(commentNotification.data)

        return comm
    } 
    catch(err){
        console.log(err)
        return err
    }
}

exports.getAllComments = async (req) => {
    try{
        const {postId} = req.params
        const comments = await Comments.find({postId: postId}).populate("userId", "name headline company").sort({createdAt: -1}).limit(5);
        return comments
    }catch(err)
    {
        console.log(err)
        return err
    }
}


exports.editComments = async (req) => {
    try{
        const userId = req.id
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
    const userId = req.id
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