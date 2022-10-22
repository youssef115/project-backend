const mongoose=require("mongoose");
const Message=mongoose.Schema({
    message:{
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

module.exports=mongoose.model("message",Message);
