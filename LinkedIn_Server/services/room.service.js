const { Room } = require("../models/room")



exports.createRoom =  async (req) => {
    try{
        
        const participants = req.body
        // console.log(participants)
        const existingRoom = await Room.findOne({participants}).populate("participants", "name headline")
        // console.log(existingRoom)
        if(existingRoom){
            return existingRoom
        }
        else{
            const room = new Room({
                participants: participants
            })
            await room.save()
            return room.populate("participants", "name headline")
        }
    }catch(err) {
        console.log(err)
        throw err
    }
}

exports.fetchRooms = async (req) => {
    try{
        const userId = req.id
        const rooms = await Room.find({participants: {"$all": [userId]}}).populate('participants', 'name headline').sort({createdAt: -1})
        return rooms

    }catch(err){
        console.log(err)
        throw err
    }
}