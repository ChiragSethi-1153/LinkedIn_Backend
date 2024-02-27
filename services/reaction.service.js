const { Reactions } = require("../models/reactions")



exports.savePostReaction = async (req) => {
    try{ 
        const userId = req.id
        const {postId} = req.params
        const {emoji} = req.body
        const existingReaction =  await Reactions.findOne({"$and": [{userId: userId}, {postId: postId}]}) 
        console.log(existingReaction?.emoji)

        if(existingReaction){
            const newReaction = await Reactions.findOneAndUpdate({"$and": [{userId: userId}, {postId: postId}]}, {emoji: emoji}, {new: true})
            console.log(newReaction,"hbiu")
            return newReaction
        }
        else {
            const reaction = new Reactions({
                postId: postId,
                userId,
                emoji
            })
            await reaction.save()
            return reaction
        }
        
    }catch(err){
        console.log(err)
        return err 
    }
}

exports.getPostReactions = async (req) => {
    try{
        const userId = req.id
        const {postId} = req.params
        const totalReactions = await Reactions.countDocuments({postId: postId})
        
        const currReaction = await Reactions.find({"$and": [{postId: postId}, {userId: userId}]})
        const reactions = {currReaction: currReaction, totalReactions}
        return reactions 
    }
    catch(err){
        console.log(err)
        return err
    }
}


exports.saveCommentReaction = async (req) => {
    try{ 
        const userId = req.id
        const {commentId} = req.params
        const {emoji} = req.body

        const existingReaction =  await Reactions.findOne({"$and": [{userId: userId}, {commentId: commentId}]}) 
        console.log(existingReaction?.emoji)

        if(existingReaction){
            const newReaction = await Reactions.updateOne({"$and": [{userId: userId}, {commentId: commentId}]}, {emoji: emoji})
            console.log(newReaction)
            return newReaction
        }
        else {
            const reaction = new Reactions({
                commentId: commentId,
                userId,
                emoji
            })
            await reaction.save()
            return reaction
        }
     
    }catch(err){
        console.log(err)
        return err 
    }
}

exports.getCommentReactions = async (req) => {
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
        const userId = req.id
    const {reactionId} = req.params
    const {emoji} = req.body
    const currentUserId = await Reactions.findById(reactionId)

   
        if(userId === currentUserId.userId ){
            const edit = await Reactions.findByIdAndUpdate(reactionId, {emoji}, {new: true})
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

exports.removeReaction = async (req) => {
    try{
    const {postId} = req.params
    const userId = req.id

        // if(){
            const del = await Reactions.findOneAndDelete({"$and": [{postId: postId},{userId: userId}]})
            return del
        // }   
        // else {
        //     return 401
        // }
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