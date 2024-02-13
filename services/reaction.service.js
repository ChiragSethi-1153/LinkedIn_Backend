const { Reactions } = require("../models/reactions")



exports.saveReaction = async (req) => {
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

exports.getReactions = async () => {
    try{
        const reactions = await Reactions.find()
        return reactions
    }
    catch(err){
        
    }
}

exports.updateReaction = async (req) => {
    const {reactionId} = req.params
    const {userId, emoji} = req.body
    const currentUserId = await Reactions.findById(reactionId)

    try{
        if(userId == currentUserId.userId ){
            const edit = await Reactions.findByIdAndUpdate(reactionId, {emoji}, {new: true})
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

exports.removeReaction = async (req) => {
    const {reactionId} = req.params
    const {userId} = req.body
    const currentUserId = await Reactions.findById(reactionId)

    try{
        if(userId == currentUserId.userId ){
            const edit = await Reactions.findByIdAndDelete(reactionId)
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