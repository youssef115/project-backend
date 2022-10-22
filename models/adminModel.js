const mongoose=require("mongoose");


const Admin=mongoose.Schema({
    nom:{
        type:String,
        required:true,
        maxLength:30,
        minLength:2 
    },
    prenom:{
        type:String,
        requried:true,
        maxLength:30,
        minLength:3

    },
    login:{
        type:String,
        requried:true,
        unique:true,
        maxLength:30,
        minLength:3

    },
    mot_de_passe:{
        type:String,
        required:true,
        maxLength:30,
        minLength:3


    }
})

module.exports=mongoose.model("Admin",Admin);