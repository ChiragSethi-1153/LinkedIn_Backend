const { Posts } = require("../models/posts")

exports.createPosts = async(req) => {
    const {id} = req.params;
    const { title, body} = req.body

    const post = new Posts({
        userId: id,
        title,
        body
    })

    try{
        post.save()
        return post
    }
    catch(err){
        console.log(err)
    }
} 

exports.getPost = async (req) => {

    const {id} = req.params 
    try{
        const post = Posts.findOne({userId: id})
        return post
    }catch(err)
    {
        console.log(err)
    }


}

exports.updatePost = async (req) => {
    const {id} = req.params
    const { body, title } = req.body;
    // console.log(req.body)
    try{
        const updated = await Posts.findByIdAndUpdate(id, {title, body}, {new: true})
        console.log(updated)
        return updated;
    }catch(err){ 
        console.log(err)
    }
}

