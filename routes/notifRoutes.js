const express = require('express')
const router=express.Router()
const Notif=require('../models/notifModel')
const Etudiant=require('../models/etudiantModel');
const Enseigant=require('../models/enseigantModel');

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

//get all notif
router.get('/',async(req,res)=>{
    try{
        let notif = await Notif.find({})
        const asyncRes = await Promise.all(notif.map(async e=> await addMissingData(e)));
       console.log(asyncRes)
         res.send(asyncRes)
        
    }
    catch(err){
        res.send(err)
    }
})
//this methode is used to find the user if he is 'etudiant' or 'enseigant' then get all his information

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

router.post('/addnotif/:id',async(req,res)=>{

    try{
           const addnotif = new Notif ({
                notif:req.body.notif,
                ref:req.params.id,
            })
         await addnotif.save() 
        
         res.send(addnotif)
    }
    catch(err){
        res.send(err)
        console.log(req.params.idEnseigant)
    }
})

//delete notif
router.delete('/deletenotif/:id',async(req,res)=>{
    try{
        let deletenotif =  await Notif.findOneAndRemove({id:req.params.id})
        res.send(deletenotif)
    }
  catch(err){
     res.send(err)
     
    }
    })
module.exports=router;