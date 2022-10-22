const express=require('express');
const router=express.Router();
const Admin=require("../models/adminModel");

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
router.get("/getOneAdmin/:login",async (req,res)=>{
    try{
        let oneAdmin=await Admin.findOne({login:req.params.login})
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

module.exports=router