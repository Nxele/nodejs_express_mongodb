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

//detele a user
app.delete('/api/users/:id',(req,res)=>{
    MongoClient.connect(connection_url,connection_config,(err,db)=>{
        if(err) throw err;
        const dbo = db.db('getsome').collection('user');
        const deleteUser = {name:req.params.id}
        dbo.deleteOne(deleteUser,(erro,result)=>{
            if(erro) throw erro;
            res.send(result);
            db.close();
        })
    })
})

//get all users
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

//insert a new user
app.post('/api/users',(req,res)=>{
    MongoClient.connect(connection_url,connection_config,(erro,db)=>{
        if(erro) throw erro;
        const dbo = db.db("mytodo").collection("user");
        dbo.insertOne(req.body,(erro,result)=>{
            if(erro) throw erro
            res.send(result.insertedId)
            db.close();
        })
    })
})

//authanticate user for login
app.post('/api/users/authenticate',(req,res)=>{
    MongoClient.connect(connection_url,connection_config,(erro,db) =>{
        if(erro) throw erro;
        const dbo = db.db("mytodo").collection("user");
        const loginQuery = {"username":req.body.username,"password":req.body.password};
        dbo.find(loginQuery).toArray((erro,result)=>{
            if(erro) throw erro
            if(result.length>0){
                res.send("loginpassed")
            }
            else{
                res.send("loginfailed")
            }
            db.close();
        })
    })
})

//update user information
app.put('/api/users/:name',(req,res)=>{
    MongoClient.connect(connection_url,connection_config,(err,db)=>{
        const dbo = db.db('getsome').collection('user');
        const username = {name:req.params.name}
        const updateUser = {$set:{address:req.body.address}}
        console.log(req.params.name)
        console.log(req.body.address)
        dbo.updateOne(username,updateUser,(err,result)=>{
            res.send(result);
            db.close();
        })
    })
})

app.listen(3000,()=>{
    console.log("started");
})