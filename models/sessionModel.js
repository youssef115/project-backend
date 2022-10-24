const mongoose=require("mongoose");


const Session=mongoose.Schema({
    nomSession:{
        type:String,
        required:true,
        maxLength:50,
        minLength:5 
    }
})
    module.exports=mongoose.model("Session",Session);