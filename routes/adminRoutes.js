const express=require('express');
const router=express.Router();
const Admin=require("../models/adminModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
//GET ALL ADMINS
router.get("/",async (req,res)=>{
    try{
        let admins=await Admin.find({})
        res.send(admins)
    }catch(err){
        console.log(err)
    }
})
//get one admin
router.get("/getOneAdmin/:id",async (req,res)=>{
    try{
        let oneAdmin=await Admin.findOne({_id:req.params.id})
        res.send(oneAdmin);
    }catch(err){
        console.error(err)
    }
})

// post new admin
router.post('/addAdmin',async (req,res)=>{
    try{
        const newAdmin=new Admin({
            nom:req.body.nom,
            prenom:req.body.prenom,
            login:req.body.login,
            mot_de_passe:req.body.mot_de_passe
        })
        await newAdmin.save();
        res.send(newAdmin);
    }catch(err){
        console.log(err)
    }
})
// update admin
router.put("/updateAdmin/:id",async (req,res)=>{
    try{
        bcrypt.hash(req.body.mot_de_passe, saltRounds,async (err,hash)=>{
        let e=await Admin.findOneAndUpdate({_id:req.params.id},
            {
                nom: req.body.nom,
                prenom: req.body.prenom,
                login: req.body.login,
                mot_de_passe: await hash
            })
            res.send(e)  
        })
             
    }catch(err){
        console.log(err)
    }
});


module.exports=router