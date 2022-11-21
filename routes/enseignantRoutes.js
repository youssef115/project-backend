const express=require("express");
const router=express.Router();
// const multer=require('multer')
const Enseignant=require("../models/enseignantModel");

//multer configuration
// const storage=multer.diskStorage({
// destination
// })

//get all the enseigant
router.get("/",async (req,res)=>{
    try{
        await Enseignant.find({}).select("nom prenom ncin ntel email specialite").then(result=>{
            res.send(result);
        });
        
    }catch(err){
        res.send(err)
        console.log(err);
    }
});
//get one 
router.get("/getOne/:cin",async(req,res)=>{
    await Enseignant.findOne({ncin:req.params.cin}).then(result=>res.send(result)).catch(err=>console.log(err))
})
// get the number of the 'enseigant'
router.get('/numberOf',async (req,res)=>{
    try{
      const number=await Enseignant.find({}).count()
      res.json({"number":number})
    }catch(err){
        console.log(err)
    }
})
//get only the valid teachers
router.get("/valid",async(req,res)=>{
    
        await Enseignant.find({etat:true}).select("nom prenom ncin ntel email specialite")
        .then(result=>res.send(result))
        .catch(err=>console.log(err))
    
})
//get only the not valid teachers
router.get("/notValid",async(req,res)=>{
    await Enseignant.find({etat:false}).select("nom prenom ncin ntel email specialite")
    .then(result=>res.send(result))
    .catch(err=>console.log(err))
})
// get only one enseigant 
router.get("/:cin",async(req,res)=>{
    try{
        let e=await Enseignant.findOne({ncin:req.params.cin})
        res.send(e);
    }catch (err){
        console.log(err);
    }
})
// make teacher validate 
router.put("/validateUser/:cin",async(req,res)=>{
    await Enseignant.findOneAndUpdate({ncin:req.params.cin},{etat:true})
    .then(result=>res.send(result))
    .catch(e=>console.log(e))
})
//update teacher data 
router.put("/updateEnseigant/:id",async (req,res)=>{
    try{

        let e=await Enseignant.findOneAndUpdate({_id:req.params.id},
            {
                nom: req.body.nom,
                prenom: req.body.prenom,
                login: req.body.login,
                ncin: req.body.ncin,
                ntel: req.body.ntel,
                email: req.body.email,
                ville: req.body.ville,
                specialite: req.body.specialite,
            })
            
        res.send(e)        
    }catch(err){
        console.log(err)
    }
});



//delete enseigant
router.delete("/deleteEnseigant/:cin",async (req,res)=>{
    try{
       let e= await Enseignant.findOneAndDelete({ncin:req.params.cin});
       
       res.send(e)
    }catch(err){
        console.error(err);
    }
})

// to add new enseigant
router.post("/addEnseignant",async (req,res)=>{
    try{
    const newEnseignant=new Enseignant({
        nom:req.body.nom,
        prenom:req.body.prenom,
        login:req.body.login,
        mot_de_passe:req.body.mot_de_passe,
        ncin:req.body.ncin,
        ntel:req.body.ntel,
        email:req.body.email,
        ville:req.body.ville,
        specialite:req.body.specialite,
        fichier:req.body.fichier,
        etat:false
        })
      await newEnseignant.save();  
      res.send(newEnseignant)
    }catch(err){
        console.log(err);
    }
})


module.exports =router;