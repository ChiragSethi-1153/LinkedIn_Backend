const {roomService} = require('../services')

exports.createRoom = async (req, res) => {
    try{
        const response = await roomService.createRoom(req)
        return res.status(200).json(response)
    }catch(err){
        console.log(err)
        return res.status(500).send(err)
    }
}