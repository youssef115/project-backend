const mongoose = require('mongoose')

const Cour=mongoose.Schema({

    nomCour:{
        type:String,
        required:true,
        maxLength:30,
        minLength:4 
    }
})
module.exports=mongoose.model('cour',Cour)