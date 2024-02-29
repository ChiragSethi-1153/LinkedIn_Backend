const multer = require('multer')
const path = require('path')

exports.upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            console.log(req.files)
           return cb(null, ("uploads"))
        },
        filename: (req, file, cb) => {
           return cb(null, `${Date.now()}_${file.originalname}`)
        }
   
    })
}).fields([{name: 'images', maxCount: 12}]);
