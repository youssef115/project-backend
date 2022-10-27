const express = require('express');
const router = express.Router();
const Cour = require('../models/courModel')

//get all cours
router.get ('/',async(req,res)=>{

    try{
    let cour = await Cour.find().populate('refSession','_id nomSession');
    res.send(cour)

    }
    catch(err){
        res.send(err)
    }
})

//get one cour
router.get('/:nomCour', async(req,res)=>{
    try{
        let onecour = await Cour.findOne({nomCour:req.params.nomCour})
        res.send(onecour)
    }
    catch(err){
        res.send(err)
    }
})

//add cour
router.post('/addcour/:idSession', async(req,res)=>{
 try{
  const newcour = new Cour({
    nomCour:req.body.nomCour,
    refSession:req.params.idSession
  }) 
     await newcour.save();
     res.send(newcour)
 }
catch(err){

    res.send(err)
}
})

//remove cour
router.delete('/deletecour/:nomCour', async(req,res)=>{
    try{
        let deletecour = await Cour.findOneAndRemove({nomCour:req.params.nomCour})
        res.send(deletecour)
    }
    catch(err){
        res.send(err)
    }  

})
//updatecour

router.put('/updatecour/:nomCour',async(req,res)=>{

    try{
        let updatecour = await Cour.findOneAndUpdate({nomCour:req.params.nomCour}, {
            nomCour: req.body.nomCour
        })
        res.send(updatecour)
     }
     catch(err){
        res.send(err)
     }
        })
    


 module.exports=router;