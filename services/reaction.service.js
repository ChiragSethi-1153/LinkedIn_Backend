const { Reactions } = require("../models/reactions")



exports.savePostReaction = async (req) => {
    try{ 
        const {postId} = req.params
        const {userId, emoji} = req.body
        const reaction = new Reactions({
            postId: postId,
            userId,
            emoji
        })
        await reaction.save()
        return reaction
    }catch(err){
        console.log(err)
        return err 
    }
}

exports.getPostReactions = async (req) => {
    try{
        const {postId} = req.params
        const reactions = await Reactions.countDocuments({postId: postId})
        return reactions
    }
    catch(err){
        console.log(err)
        return err
    }
}


exports.saveCommentReaction = async (req) => {
    try{ 
        const {commentId} = req.params
        const {userId, emoji} = req.body
        const reaction = new Reactions({
            commentId: commentId,
            userId,
            emoji
        })
        await reaction.save()
        return reaction
    }catch(err){
        console.log(err)
        return err 
    }
}

exports.getCommentReactions = async () => {
    try{
        const {commentId} = req.params
        const reactions = await Reactions.countDocuments({commentId: commentId})
        return reactions
    }
    catch(err){
        console.log(err)
        return err 
    }
}


exports.updateReaction = async (req) => {
    try{
    const {reactionId} = req.params
    const {userId, emoji} = req.body
    const currentUserId = await Reactions.findById(reactionId)

   
        if(userId === currentUserId.userId ){
            const edit = await Reactions.findByIdAndUpdate(reactionId, {emoji}, {new: true})
            return edit
        }   
        else {
            return "Unauthorized User"
        }
    }
    catch(err){
        console.log(err)
        return err
    }
}

exports.removeReaction = async (req) => {
    try{
    const {reactionId} = req.params
    const {userId} = req.id
    const currentUserId = await Reactions.findById(reactionId)

        if(userId == currentUserId.userId ){
            const del = await Reactions.findByIdAndDelete(reactionId)
            return del
        }   
        else {
            return "Unauthorized User"
        }
    }
    catch(err){
        console.log(err)
        return err
    }
}

exports.deleteReactions = async (req) => {
    try{
        const {commentId} = req.params
        const del = await Reactions.find({commentId: commentId})
        return del 
    }catch(err){
        console.log(err)
        return err
    }

}