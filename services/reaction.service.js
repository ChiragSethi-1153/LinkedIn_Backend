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