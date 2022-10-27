
const mongoose = require('mongoose')
const Notif = mongoose.Schema({
    notif:{
        type:String,
        required:true,
    },
    refEnseigant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'enseigant'
    },
    refEtudiant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'etudiant'
    }
})
module.exports=mongoose.model('notif',Notif)