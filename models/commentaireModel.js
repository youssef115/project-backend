const mongoose=require("mongoose");
const Commentaire=mongoose.Schema({
    commentaire:{
        type:String,
        required:true,
        minLength:5
    },
    temps:{
        type:Date,
        
    },
    refSender:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'etudiant',
        ref:'enseigant',
        required:true
    }

})

module.exports=mongoose.model("commentaire",Commentaire);