const express=require("express");
const router=express.Router();
const Commentaire=require("../models/commentaireModel");


router.get("/",async (req,res)=>{
    try{

       let commentaire= await Commentaire.find({})
       res.send(commentaire);

    }catch(err){
        res.send(err)
    }
})

router.post("/addcommentaire",async(req,res)=>{
    try{
        const newcommentaire=new Commentaire({
            commentaire:req.body.commentaire,
            temps:Date.now(),
            sender:req.body.sender
            
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