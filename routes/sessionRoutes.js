const express=require('express');
const router=express.Router();
const Session=require("../models/sessionModel");
//new added
const Enseigant=require("../models/enseignantModel");
const Etudiant=require("../models/etudiantModel");
const R = require('ramda');


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


//get all session 
router.get("/",async (req,res)=>{
    try{
        const sessions= await Session.find({})
        //sessions.map(async e=> console.log(await addMissingData(e)))
       const asyncRes = await Promise.all(sessions.map(async e=> await addMissingData(e)));
       console.log(asyncRes)
         res.send(asyncRes)
        
    }
    catch(err){
        console.log(err)
    }
})
//this used to find the user if he is a 'enseigant' or 'etudiant' to used in the get session
//I make this change just to figure out the problem that i have to add two refrence of the 'enseigan' or 'etudiant'
//so with only one ref we can check what the type of the use then we show it without problem xD
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


//get a session 
router.get('/:nomSession', async(req,res)=>{
    try{
       let oneSession = await Session.findOne({nomSession:req.params.nomSession})
       const iduser=oneSession.ref;
       console.log(iduser);
       //here the return of the function 'findTheUser' can be 'etudiant' or 'enseigant'
       const user=await findTheUser(iduser);
       console.log(user);
        oneSession.ref=user;
        res.send(oneSession)
    }
    catch(err){
        res.send(err)
    }
})





router.post('/addSession/:id',async(req,res)=>{
    try{
       const newSession= new Session({
        nomSession:req.body.nomSession,
        ref:req.params.id,
       })
        await newSession.save();
        res.send(newSession)
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