const {reactionService} = require('../services')

exports.saveReactions = async (req, res) => {
    console.log("wcwe")
    try{
        const response = await reactionService.saveReaction(req)
        
        return res.status(201).json({response})
    }catch(err){
        console.log(err)
        return res.status(400).send(err)
    }
}