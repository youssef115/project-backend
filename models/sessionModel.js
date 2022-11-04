const mongoose=require("mongoose");


const Session=mongoose.Schema({
    nomSession:{
        type:String,
        required:true,
        maxLength:50,
        minLength:5 
    },
   
    ref:{
        type:String,
        
    }
})
    module.exports=mongoose.model("Session",Session);