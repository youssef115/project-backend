const express=require("express");
const router=express.Router();
const Message=require("../models/messageModel");


router.get("/",async (req,res)=>{
    try{

       let message= await Message.find().populate('refEnseigant','nom').populate('refEtudiant','nom')
       res.send(message);

    }catch(err){
        console.error(err)
    }
})

router.post("/addMessage/:idEnseigant/:idEtudiant/",async(req,res)=>{
    try{
        const newMessage=new Message({
            message:req.body.message,
            temps:Date.now(),
            sender:req.body.sender,
            refEnseigant:req.params.idEnseigant,
            refEtudiant:req.params.idEtudiant
        })
        await newMessage.save();
        res.send(newMessage);
    }catch(err){
        console.log(err)
    }
})

module.exports=router;