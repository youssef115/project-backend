const express = require('express')
const router=express.Router()
const Notif=require('../models/notifModel')


//get all notif
router.get('/',async(req,res)=>{
    try{
        let notif = await Notif.find({})
        res.send(notif)
    }
    catch(err){
        res.send(err)
    }
})

/*router.post('/addnotif',async(req,res)=>{

    try{
        const addnotif = new Notif ({
            notif:req.body.notif
        })
         await addnotif.save() 
         res.send(addnotif)
    }
    catch(err){
        res.send(err)
    }
})*/

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