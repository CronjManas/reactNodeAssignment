const expres = require('express');
const mongoose = require('mongoose');
const app = expres();
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;

const mongoDB = 'mongodb://127:0:0:1:27017/Mydb';


app.use(bodyParser.json());


app.get('/api/recent',(req,res)=>{
   MongoClient.connect('mongodb://127.0.0.1:27017',(err,client)=>{
      const db = client.db('MyDb');
      db.collection('search').find({}).toArray((err,data)=>{
         res.send(data);
      })
      
})
});

app.get('/api', (req,res)=>{
   
   MongoClient.connect('mongodb://127.0.0.1:27017',(err,client)=>{
         
        if(err){
         console.log('Error occured',err);
        } else{
      const db = client.db('MyDb');
      db.collection('reports').find({}).toArray().then((data)=>{
         
         res.send(data);

      })
   }
      
   })


       
});
app.post('/api/searchQuery', (req,res)=>{
   MongoClient.connect('mongodb://127.0.0.1:27017', (err,client)=>{
      const db = client.db('MyDb');

      let count = db.collection('search').count().then((count)=>{
         if(count <5){
             db.collection('search').insertOne(req.body.search);
          }else{
            db.collection('search').replaceOne(
               {"id":req.body.search.id},
               {"id":req.body.search.id,"query":req.body.search.query}
            )
          }
      });
      
        
           
       
      
   });
   
});

app.get('/api/:value',(req,res)=>{
   MongoClient.connect('mongodb://127.0.0.1:27017',(err,client)=>{
      const db = client.db('MyDb');
      db.collection('reports').find({ $or : [{title:{$regex:req.params.value}},{description:{$regex:req.params.value}}]}).toArray((err,data)=>{
         res.send(data);
      });
   });
  
});

const port = 3005;

app.listen(port, ()=> console.log(`Server started on port ${port}`));
