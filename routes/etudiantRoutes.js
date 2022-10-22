const express=require('express');
const router=express.Router();
const Etudiant=require("../models/etudiantModel");

//get all the etudiants
router.get('/',async (req,res)=>{
    try{
       let etudiant=await Etudiant.find();
       res.send(etudiant);
    }catch(err){
        console.log(err);
    }
})

// get only one etudiant
router.get("/:cin",async(req,res)=>{
    try{
        let etudiant=await Etudiant.findOne({ncin:req.params.cin});
        res.send(etudiant);
    }catch(err){
        console.log(err)
    }
})

// Update etudiant change name
router.put("/updateEtudiant/:cin/:name",async (req,res)=>{
    try{    
        let upEtudiant=await Etudiant.findOneAndUpdate({ncin:req.params.cin},{nom:req.params.name});
        res.send(upEtudiant);
    }catch(err){
        console.log(err)
    }
})
router.delete("/deleteEtudiant/:cin",async (req,res)=>{
    try{
        let detEtudiant=await Etudiant.findOneAndRemove({ncin:req.params.cin})
        res.send(detEtudiant);
    }catch(err){
        console.log(err)
    }
})

// post a new etudiant 
router.post("/addEtudiant",async(req,res)=>{
    try{
        const newEtudiant=new Etudiant({
            nom:req.body.nom,
            prenom:req.body.prenom,
            login:req.body.login,
            mot_de_passe:req.body.mot_de_passe,
            ncin:req.body.ncin,
            ntel:req.body.ntel,
            email:req.body.email,
            ville:req.body.ville,
            classe:req.body.classe
        })
        await newEtudiant.save();
        res.send(newEtudiant)
    
    }catch(err){
        console.log(err)
    }
})

module.exports =router;