
const mongoose = require('mongoose')
const Notif = mongoose.Schema({
    notif:{

        type:String,
        required:true,
    }
})
module.exports=mongoose.model('notif',Notif)