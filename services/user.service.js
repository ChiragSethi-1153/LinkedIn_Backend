const Users = require('../models/users')
const bcrypt = require('bcryptjs')


exports.signup = async (req) => {
    try{
    console.log(req.body)
    const {name, email, password} = req.body;
   
    
    const existingUser = await Users.findOne({email: email});
      
    if(existingUser){
        return 409;
    }

    const hashedPassword = bcrypt.hashSync(password)

    const user = new Users({
        name,
        email,
        password: hashedPassword
    });

        await user.save();
        return user
    }
    catch(err) {
        console.log(err)
        return err
    }

}

exports.login = async (req, res) => {
    try{
    const {email, password} = req.body
    
      const existingUser  = await Users.findOne({email:email})
        if(!existingUser) {
            return 204
        }
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if(!isPasswordCorrect) {
            return 400
        }
        return existingUser
    } catch(err){
        return new Error(err);
    }

}

exports.getUser = async (req) => {
   
    try{
        const userId = req.id;
        const user = await Users.findById(userId, "-password")
        if(!user) {
            return 404
        }
        else{
            return user
        }
    }catch(err){
        return new Error(err)
    }
    
}

exports.editUser = async (req) => {
    try{
        const userId = req.id
        const {name, address, phone, website, company, summary} = req.body
        const currentUserId = await Users.findById(userId)
        if(currentUserId == null){ 
            return 404
        }
        else {
            const userDetails = await Users.findByIdAndUpdate(userId, {name, address, phone, website, company, summary}, {new: true})
            return userDetails
        }

    }catch(err){
        console.log(err)
        return err
    }
}