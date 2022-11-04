const express=require("express");
const router=express.Router();
const Commentaire=require("../models/commentaireModel");
const Etudiant=require('../models/etudiantModel')
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

//get all the commentaire
router.get("/",async (req,res)=>{
    try{

       let commentaire= await Commentaire.find({})
       const asyncRes = await Promise.all(commentaire.map(async e=> await addMissingData(e)));
       console.log(asyncRes)
         res.send(asyncRes)

    }catch(err){
        res.send(err)
    }
})
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
//post a new commentaire
router.post("/addcommentaire/:idSender",async(req,res)=>{
    try{
        const newcommentaire=new Commentaire({
            commentaire:req.body.commentaire,
            temps:Date.now(),
            ref:req.params.idSender
            
        })
        await newcommentaire.save();
        res.send(newcommentaire);
    }catch(err){
        console.log(err)
    }
})


router.delete('/deletecommentaire/:commentaire', async(req,res)=>{
    try{
        let deletecommentaire = await Commentaire.findOneAndRemove({commentaire:req.params.commentaire})
        res.send(deletecommentaire)
    }
    catch(err){
        res.send(err)
    }  

})

router.put('/updatecommentaire/:commentaire',async(req,res)=>{

    try{
        let updatecommentaire = await Commentaire.findOneAndUpdate({commentaire:req.params.commentaire}, {
            commentaire: req.body.commentaire
        })
        res.send(updatecommentaire)
     }
     catch(err){
        res.send(err)
     }
        })
    


module.exports=router;