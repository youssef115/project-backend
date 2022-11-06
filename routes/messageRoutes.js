const express=require("express");
const router=express.Router();
const Message=require("../models/messageModel");
const Etudiant=require('../models/etudiantModel');
const Enseigant=require('../models/enseignantModel');

async function addMissingData(session){
    try{
           const user=await findTheUser(session.ref);
           session.ref=user;
           //console.log("function call ",session)
            return session;    
    }catch(err){
       console.log(err);
    }
   }
//get all the messages
router.get("/",async (req,res)=>{
    try{

       let message= await Message.find()
       const asyncRes = await Promise.all(message.map(async e=> await addMissingData(e)));
       console.log(asyncRes)
         res.send(asyncRes)
       res.send(message);

    }catch(err){
        console.error(err)
    }
})

async function findTheUser(id){
    try{
    let enseigant=await Enseigant.findById(id).select("nom prenom ncin")
    if(enseigant!=null){
        return enseigant
    }else{
        let etudiant =await Etudiant.findById(id).select("nom prenom ncin")
        return etudiant;
    }
    }catch(err){
        console.log(err)
    }
}
//post one message
router.post("/addMessage/:id",async(req,res)=>{
    try{
        const newMessage=new Message({
            message:req.body.message,
            temps:Date.now(),
            sender:req.body.sender,
            ref:req.params.id,
           
        })
        await newMessage.save();
        res.send(newMessage);
    }catch(err){
        console.log(err)
    }
})

module.exports=router;