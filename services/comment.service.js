const {Comments} = require('../models/comments')

exports.postComment = async (req) => {
    const {postId} = req.params;
    const {userId, body} = req.body
    console.log(req.body)

    try{
        const comment = new Comments({
            userId,              //user Id can send as body from frontend by storing it in localstorage
            postId: postId,
            body,
        })
        await comment.save()
        return comment
    }
    catch(err){
        console.log(err)
    }
}

exports.getAllComments = async (req) => {
    try{
        const comments = await Comments.find({}).sort({createdAt: -1}).limit(3);
        return comments
    }catch(err)
    {
        console.log(err)
    }
}


exports.editComments = async (req) => {
    const {commentId} = req.params
    const {userId, body} = req.body
    const currentUserId = await Comments.findById(commentId)

    try{
        if(userId == currentUserId.userId ){
            const edit = await Comments.findByIdAndUpdate(commentId, {body}, {new: true})
            return edit
        }   
        else {
            return "Unauthorized User"
        }
    }
    catch(err){
        console.log(err)
    }
}

exports.deleteComment = async (req) => {
    const {commentId} = req.params
    const {userId} = req.body
    const currentUserId = await Comments.findById(commentId)

    try{
        if(userId == currentUserId.userId ){
            const del = await Comments.findByIdAndDelete(commentId)
            return del
        }   
        else {
            return "Unauthorized User"
        }
    }
    catch(err){
        console.log(err)
    }
}