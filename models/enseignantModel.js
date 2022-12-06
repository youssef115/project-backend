const mongoose=require("mongoose");

const Enseignant=mongoose.Schema({
    nom:{
        type: String,
        required:true,
        maxLength:30,
        minLength:2  
    },
    prenom:{
        type:String,
        required:true,
        maxLength:30,
        minLength:5
        
    },
    login:{
        type:String,
        required:true,
        unique:true,
        maxLength:30,
        minLength:5
    },
    mot_de_passe:{
        type:String,
        required:true,
        
        minLength:5
    },
    ncin:{
        type:Number,
        required:true,
        unique:true,
        maxLength:8,
        minLength:8
    },
    ntel:{
        type:Number,
        required:true,
        unique:true,
        maxLength:8,
        minLength:8
    },
    email:{
        type:String,
        required:true,
        unique:true,
        maxLength:50,
        minLength:8
    },
    ville:{
        type:String,
        required:true,
        minLength:5,
    },
    specialite:{
        type:String,
        required:true,
        minLength:2,
        maxLength:30
    },
    fichier:{
        type:String
    },
   etat:{
        type:Boolean,
        required:true
    },
    rejected:{
        type:Boolean,
        required:true
    },
    admin:{
        type:Boolean,
        required:true
    }

})

module.exports=mongoose.model('enseigant',Enseignant);