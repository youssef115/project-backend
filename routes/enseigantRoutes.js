const express=require("express");
const router=express.Router();
const Enseigant=require("../models/enseigantModel");

//get all the enseigant
router.get("/",async (req,res)=>{
    try{
        await Enseigant.find({}).then(result=>{
            res.send(result);
        });
        
    }catch(err){
        res.send(err)
        console.log(err);
    }
});
// get only one enseigant 
router.get("/:cin",async(req,res)=>{
    try{
        let e=await Enseigant.findOne({ncin:req.params.cin})
        res.send(e);
    }catch (err){
        console.log(err);
    }
})

//update enseigant change the name
router.put("/updateEnseigant/:CIN/:name",async (req,res)=>{
    try{

        let e=await Enseigant.findOneAndUpdate({ncin:req.params.CIN},{nom:req.params.name})
        res.send(e)        
    }catch(err){
        console.log(err)
    }
});

//delete enseigant
router.delete("/deleteEnseigant/:CIN",async (req,res)=>{
    try{
       let e= await Enseigant.findOneAndDelete({ncin:req.params.CIN});
        res.send(e)
    }catch(err){
        console.error(err);
    }
})

// to add new enseigant
router.post("/addEnseigant",async (req,res)=>{
    try{
    const newEnseigant=new Enseigant({
        nom:req.body.nom,
        prenom:req.body.prenom,
        login:req.body.login,
        mot_de_passe:req.body.mot_de_passe,
        ncin:req.body.ncin,
        ntel:req.body.ntel,
        email:req.body.email,
        ville:req.body.ville,
        specialite:req.body.specialite
        })
      await newEnseigant.save();  
      res.send(newEnseigant)
    }catch(err){
        console.log(err);
    }
})


module.exports =router;