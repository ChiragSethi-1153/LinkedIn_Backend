const mongoose =  require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minlenght: 8
    },
    address: {
        type: Object,
        street: {
            type: String
        },
        suite: {
            type: String
        },
        city:{
            type: String
        },
        zipcode: {
            type: String
        },
        geo: {
            type: Object,
            lat:{
                type: Number
            },
            lng: {
                type: Number
            }
        }
    },
    phone: {
        type: String
    },
    profileImage: {
        type: String
    }

})

const Users = mongoose.model('users' , userSchema)

module.exports = Users