const { Room } = require("../models/room")



exports.createRoom =  async (req) => {
    try{
        // const userId = req.id
        console.log(req.body)
        const participants = req.body
        console.log(participants)

        const room = new Room({
            participants: participants
        })
        (await room.save()).populate("participants.participant", "name")
        return room
    
    }catch(err) {
        console.log(err)
        throw err
    }
    
}