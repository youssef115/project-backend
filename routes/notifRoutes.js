const express = require('express')
const router=express.Router()
const Notif=require('../models/notifModel')


//get all notif
router.get('/',async(req,res)=>{
    try{
        let notif = await Notif.find({}).populate('refEnseigant').populate('refEtudiant')
        res.send(notif)
    }
    catch(err){
        res.send(err)
    }
})

router.post('/addnotif/:idEnseigant/:idEtudiant',async(req,res)=>{

    try{
       
        
           const addnotif = new Notif ({
                notif:req.body.notif,
                refEnseigant:req.params.idEnseigant,
                refEtudiant:req.params.idEtudiant,
            })
         await addnotif.save() 
         console.log(req.params.idEnseigant)
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