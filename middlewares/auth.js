const jwt = require('jsonwebtoken')
const key = process.env.JWT_KEY


exports.verifyToken = async (req, res, next) => {

    const headers = req.headers[`authorization`]
    const token = headers.split(" ")[1]
    // console.log(headers)
    // console.log(token)
    console.log(token);
    if (!token) {
        return res.status(404).json({ message: "No token Found" })
    }
    else {
        jwt.verify(token, key, (err, user) => {
            if (err) {
                return res.status(400).json({ message: "Invalid Token" })
            }
            else {
                console.log(user.id);
                req.id = user.id
                next();
            }
        });

    }

    // try {
    //     const headers = req.headers[`authorization`];
    //     const token = headers.split(" ")[1];

    //     if (!token) {
    //         return res.status(404).json({ message: "No token Found" })
    //     }

    //     const response = await jwt.verify(token,key);

    // } catch (err) {
    //     return res.status(500).send('Internal Server Error');
    // }
};