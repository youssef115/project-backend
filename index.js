const express=require('express');
const app=express();
const mongoose=require('mongoose');
const morgan = require('morgan')
const router=express.Router();
const helmet=require('helmet');
const bodyParser=require('body-parser');
//for dev env
app.use(helmet());
app.use(morgan('tiny'))
app.use(bodyParser.json());
//import the routers 
const enseigantRouters=require('./routes/enseigantRoutes');
const etudiantRouters=require("./routes/etudiantRoutes");
const adminRouters=require('./routes/adminRoutes');
const messageRouters=require("./routes/messageRoutes");
const sessionRouters=require('./routes/sessionRoutes');
const courRouters= require('./routes/courRoutes');
const notifRouters=require('./routes/notifRoutes');
const commentaireRouters=require('./routes/commentaireRoutes');
// use for the routes
app.use('/enseigant',enseigantRouters);
app.use('/etudiant',etudiantRouters);
app.use('/admin',adminRouters);
app.use("/message",messageRouters);
app.use('/session',sessionRouters);
app.use('/cour',courRouters);
app.use('/notif',notifRouters);
app.use('/commentaire',commentaireRouters);


app.use("/",router);

router.get('/',(req,res)=>{
    res.send({
        name:"youssef",
        lastname:"najjar"
    })
})




// connect to the database 
mongoose.connect("mongodb+srv://mongo:mongo@cluster0.bjjvrp2.mongodb.net/?retryWrites=true&w=majority",()=>{
    console.log("connected to database ");
})

app.listen (5000,(console.log("the server is runing the port 5000")))