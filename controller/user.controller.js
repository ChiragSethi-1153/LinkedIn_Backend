const {userService} = require('../services')
// const Users = require('../models/users')
const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY

exports.signup = async (req, res) => {

    try{
        const response = await userService.signup(req);
        if(response == 'User already exists! Login instead'){
            return res.status(409).json(response)
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
        if(response == 'User not found. Signup Please!'){
            return res.status(204).json({response})
        }
        else if(response == "Invalid Email / Password"){
            return res.status(400).json({response})
        }
        else{
            const token = jwt.sign({id: response._id}, key, {
                expiresIn: "1hr"
            });
            console.log("Generated Token\n", token);
            return res.status(200).json({message: "Successfully Logged In", user: response, token})
        }
    }
    catch(err){
        console.log(err)
        return res.status(500).send(err)
    }

}



exports.getUser = async (req,res) => {
    try{
        const response = await userService.getUser(req);
        if(response == 'User Not Found'){
            return res.status(204).json(response)
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
        if(response == 'User Not Found'){
            return res.status(204).json({message: "No such user", response})
        }
        else{
            return res.status(200).json(response)
        }
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}