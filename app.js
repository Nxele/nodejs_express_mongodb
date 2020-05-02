require('dotenv').config();
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const connection_url = process.env.CONNECTION_URL;
const connection_config = {useNewUrlParser: true,useUnifiedTopology: true};
//const client =  MongoClient(connection_url,{useNewUrlParser: true,useUnifiedTopology: true});

const app = express();
app.use(express.json());

//default get to my server
app.get('/',(req,res)=>{
   res.send({
       name:"sizwe",
       surname:"Nxele",
       occupation:"Software developer",
       Age:25,
       address:"245 badsen avenue"
   }) 
})


app.get('/api/users',(req,res)=>{
    MongoClient.connect(connection_url,connection_config,(err,db) => {
        if(err) throw err;
        const dbo = db.db("getsome").collection("user");
        dbo.find().toArray((erro,document)=>{
            if(erro) throw erro;
            res.send(document)
            db.close();
        })
    });
})


app.post('/api/users',(req,res)=>{
    MongoClient.connect(connection_url,connection_config,(erro,db)=>{
        if(erro) throw erro;
        const dbo = db.db("getsome").collection("user");
        dbo.insertOne(req.body,(erro,result)=>{
            if(erro) throw erro
            res.send(result.insertedId)
            db.close();
        })
    })
})


app.listen(3000,()=>{
    console.log("started");
})