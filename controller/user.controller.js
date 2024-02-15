const {userService} = require('../services')
// const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY

exports.signup = async (req, res) => {

    try{
        const response = await userService.signup(req);
        if(response === 409  ){
            return res.status(409).json({message: 'User already exists! Login instead'})
        }
        else{
            return res.status(201).json(response)
        }
    }
    catch(err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.login = async (req, res) => {

    try{
        const response = await userService.login(req, res)
        if(response === 204){
            return res.status(404).json({message: 'User not found. Signup Please!'})
        }
        if(response === 400){
            return res.status(400).json({message: "Invalid Email / Password"})
        }
            const token = jwt.sign({id: response._id}, key, {
                expiresIn: "1hr"
            });
            console.log("Generated Token\n", token);
            return res.status(200).json({message: "Successfully Logged In", user: response, token})
        
    }
    catch(err){
        console.log(err)
        return res.status(500).send(err)
    }

}



exports.getUser = async (req,res) => {
    try{
        const response = await userService.getUser(req);
        if(response === 404){
            return res.status(404).json({message: "User Not Found"})
        }
        else{
            return res.status(200).json(response)
        }
    }
    catch(err) {
        console.log(err)
        return res.status(500).send(err)
    }
}

exports.editUser = async (req, res) => {
    try{
        const response = await userService.editUser(req)
        if(response === 404){
            return res.status(404).json({message: "No such user"})
        }
        else{
            return res.status(200).json(response)
        }
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}