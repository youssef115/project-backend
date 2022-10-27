const mongoose=require("mongoose");


const Session=mongoose.Schema({
    nomSession:{
        type:String,
        required:true,
        maxLength:50,
        minLength:5 
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
    module.exports=mongoose.model("Session",Session);