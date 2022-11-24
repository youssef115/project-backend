//const path = require('path');
const multer = require('multer');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads');
    },
    filename: (req, file, cb) => {
        console.log(file);
        cb(null, Date.now() + file.originalname);
    }
})



var upload=multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*2
    }
})

module.exports = upload;