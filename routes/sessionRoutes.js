const express=require('express');
const router=express.Router();
const Session=require("../models/sessionModel");

//get all session 
router.get("/",async (req,res)=>{
    try{
        await Session.find({})
        .then(sessions=>{
            res.send(sessions)
        })
    }
    catch(err){
        console.log(err)
    }
})


//get a session 
router.get('/:nomSession', async(req,res)=>{
    try{
       let oneSesion = await Session.findOne({nomSession:req.params.nomSession})
        res.send(oneSesion)
    }
    catch(err){
        res.send()
    }
})


//add a new session 
router.post('/addSession',async(req,res)=>{
    try{
       const newSession= new Session({
      
        nomSession:req.body.nomSession
       })
        await newSession.save();
        res.send('saved')
    }
    catch(err){
        res.send(err)
    }
})


//delete a session 
router.delete('/deleteSession/:id', async(req,res)=>{

    try{
       let deleteSession= await Session.findOneAndRemove({id:req.params.id})
        res.send(deleteSession)

    }
    catch(err){
        res.send(err)
    }
})



module.exports=router;