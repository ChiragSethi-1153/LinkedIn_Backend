const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY


exports.verifyToken = (req, res, next) => {

    const headers = req.headers[`authorization`]
    const token = headers.split(" ")[1]
    
    // console.log(headers)

    if(!token) {
        res.status(404).json({message: "No token Found"})
    }
    jwt.verify(String(token),key, (err, user) => {
        if(err) {
          return  res.status(400).json({message: "Invalid Token"})
        }
        console.log(user.id);
        req.id = user.id
    });
    next();

};