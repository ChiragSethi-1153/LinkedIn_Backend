const { postService } = require("../services")


exports.NotifyNewPost = async (req, res) => {
    try{
        const response = await postService.notifyNewPost(req)
        return res.status(200).json(response) 
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}