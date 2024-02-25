const mongoose =  require('mongoose')

const validateEmail = function(email) {
    const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        validate: [validateEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: true,
        // minlenght: 8
    },
    address: {
        type: Object,
        country: {
            type: String
        },
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
    },
    website:{
        type: String
    },
    company: {
        type: Object,
      name: {
        type: String
      } ,
      catchPhrase: {
        type: String
      },
      bs:{
        type: String
      },
      designation: {
        type: String
      }
    },
    headline: {
        type: String
    },
    summary: {
        type: String
    }
}, {timestamps: true})

const Users = mongoose.model('users' , userSchema)

module.exports = Users