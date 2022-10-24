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
    sender:{
        type:Number,
        required:true
    }

})

module.exports=mongoose.model("commentaire",Commentaire);