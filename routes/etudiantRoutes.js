const express=require('express');
const router=express.Router();
const Etudiant=require("../models/etudiantModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const upload= require("./upload");
//get all the etudiants
router.get('/',async (req,res)=>{
    try{
       let etudiant=await Etudiant.find().select("nom prenom ncin ntel email classe");
       res.send(etudiant);
    }catch(err){
        console.log(err);
    }
})
//get the number of the 'etudiant'
router.get("/numberOf",async (req,res)=>{
    await Etudiant.find().count().then(result=>res.json({number:result})).catch(err=>console.log(err))
})

// get only one etudiant
router.get("/getOne/:cin",async(req,res)=>{
    try{
        let etudiant=await Etudiant.findOne({ncin:req.params.cin});
        res.send(etudiant);
    }catch(err){
        console.log(err)
    }
})
// get only the valid students
router.get("/valid",async(req,res)=>{
    await Etudiant.find({etat:true}).select("nom prenom ncin ntel email classe").then(result=>res.send(result))
    .catch(err=>console.log(err))
})
//get only the not valid students
router.get("/notValid",async(req,res)=>{
    await Etudiant.find({etat:false}).select("nom prenom ncin ntel email classe").then(result=>res.send(result))
    .catch(err=>console.log(err))
})


//update student data 
router.put("/updateEtudiant/:id",async (req,res)=>{
    try{

        let e=await Etudiant.findOneAndUpdate({_id:req.params.id},
            {
                nom: req.body.nom,
                prenom: req.body.prenom,
                login: req.body.login,
                ncin: req.body.ncin,
                ntel: req.body.ntel,
                email: req.body.email,
                ville: req.body.ville,
                classe: req.body.classe,
            })
            
        res.send(e)        
    }catch(err){
        console.log(err)
    }
});
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
            classe:req.body.classe,
            etat:false
        })
        await newEtudiant.save();
        res.send(newEtudiant)
    
    }catch(err){
        console.log(err)
    }
})

// validate student
router.put("/validateUser/:cin",async(req,res)=>{
    await Etudiant.findOneAndUpdate({ncin:req.params.cin},{etat:true})
    .then(result=>res.send(result))
    .catch(e=>console.log(e))
})
// reject student
router.put("/rejectedUser/:CIN",async(req,res)=>{
    await Etudiant.findOneAndUpdate({ncin:req.params.CIN},{rejected:true})
    .then(result=>res.send(result))
    .catch(e=>console.log(e))
})
// to signup etudiant
router.post("/signup",upload.single('fichier'), async (req, res) => {
   
    console.log(req.file);
  
      bcrypt.hash(req.body.mot_de_passe, 10, async function (err, hashedPass) {
          if (err) {
              res.json({
                  error: err
              })
          }
          else {
              console.log(hashedPass);
          }
          let etudiant = await Etudiant.findOne({ ncin: req.body.ncin });
          if (etudiant) {
              return res.send({ message: "User already exist" });
          } else {
              try {
                 
                  // Insert the new user if they do not exist yet
                  let Etud = await new Etudiant({
                      nom: req.body.nom,
                      prenom: req.body.prenom,
                      login: req.body.login,
                      mot_de_passe: hashedPass,
                      ncin: req.body.ncin,
                      ntel: req.body.ntel,
                      email: req.body.email,
                      ville: req.body.ville,
                      classe: req.body.classe,
                    // fichier:req.files.path,
                     //fichier:req.body.name,
                      etat:false,
                      rejected:false,
                    
  
                  })
                  
                     // console.log(req.files);
                     
                  
                  
                    
                      
                  //console.log(Etud.fichier);
                  
                  
                  console.log("fichier added ");
  
                  await Etud.save().then(Etudiant => {
                      //res.send(upload.single("fichier"))
                      res.json({
                          message: "user added successfully "
                      })
                      
                  });
  
                  //return req.send(req.file)
                  console.log("okkk");
  
              } catch (err) {
                  console.log(err);
              }
          }
  
  
  
  
  
  
  
      })
  
  });
  
  
  
  //signin etudiant
  router.post('/signin/', async (req, res) => {
      const { email, mot_de_passe } = req.body;
      // if (!email || !mot_de_passe) {
      //     return res.status(422).send({ error: 'Must provide email and password' })
      // }
      // console.log("okkkkk");
      try {
          console.log("try");
          const user = await Etudiant.findOne({ email });
          console.log("user found");
          console.log(user);
          if (user) {
              bcrypt.compare(mot_de_passe, user.mot_de_passe, function (err, result) {
                  if (err) {
                      console.log("err");
                      res.json({
                          error: err
                      })
                  }
                  if (result) {
                      console.log("result");
                      let token = jwt.sign({ nom: user.nom ,login:user.login}, 'verySecretValue')
  
                      res.send({
                          message: 'login successful',
                          token
                      })
                  } else {
                      res.send({
                          message: "Password does not matched"
                      })
                  }
              })
          } else {
              res.send({
                  message: 'No user found'
              })
          }
  
      } catch (err) {
          console.log(err);
      }
  
      console.log("okkkkk");
      try {
  
  
  
      } catch (err) {
          return res.status(422).send({ error: 'errr' });
      }
  });
  

module.exports =router;