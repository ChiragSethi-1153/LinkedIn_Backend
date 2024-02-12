const Users = require('../models/users')
const bcrypt = require('bcryptjs')


exports.signup = async (req) => {
    console.log(req.body)
    const {name, email, password} = req.body;
    let existingUser;
    try{
        existingUser = await Users.findOne({email: email});
    } catch (err) {
        console.log(err)
    }   
    if(existingUser){
        return "User already exists! Login instead";
    }

    const hashedPassword = bcrypt.hashSync(password)

    const user = new Users({
        name,
        email,
        password: hashedPassword
    });

    try{
        await user.save();
        return user
    }
    catch(err) {
        console.log(err)
    }

}

exports.login = async (req, res) => {
    const {email, password} = req.body

    let existingUser;
    try{
        existingUser  = await Users.findOne({email:email})
        if(!existingUser) {
            return "User not found. Signup Please!"
        }
        const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
        if(!isPasswordCorrect) {
            return "Invalid Email / Password"
        }
        return existingUser
    } catch(err){
        return new Error(err);
    }

}

exports.getUser = async (req) => {
    const userId = req.id;
    let user;
    try{
        user = await Users.findById(userId, "-password")
        if(!user) {
            return "User Not Found"
        }
        else{
            return user
        }
    }catch(err){
        return new Error(err)
    }
    
}