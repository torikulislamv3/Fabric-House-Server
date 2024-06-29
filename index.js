const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;

// MIDDLE-WARE
app.use(cors());
app.use(express.json());







const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.v40qcvb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;



const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // await client.connect()

    const itemCollection = client.db('allItems').collection('Items');
    // data send on client side 
    app.get('/Items', async(req, res)=>{
      const cursor = itemCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })


    app.get('/Items/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      const cursor = itemCollection.find(query);
      const result = await cursor.toArray();
      res.send(result);
    })
   
    app.get('/Items/:id', async(req, res)=>{
      const id = req.params.id;
      const query = {_id: new ObjectId(id)}
      
      const result = await itemCollection.find(query)
      res.send(result);
    })
    
    



    // data post or create operation
app.post('/Items', async(req, res)=>{
  const newItem = req.body;
  console.log(newItem);
  const result = await itemCollection.insertOne(newItem);
  res.send(result)
})

app.put("/Items/:id", async(req, res)=>{
  const id = req.params.id;
  const filter = {_id : new ObjectId(id)} 
  const options = {upsert : true};
  const updatedItem = req.body;
  const update = {
    $set : {
      imgUrl:updatedItem.imgUrl,
       itemName:updatedItem.itemName,
        subcategoryName:updatedItem.subcategoryName,
         price:updatedItem.price,
          shotDescription:updatedItem.shotDescription,
          rating:updatedItem.rating,
          customization:updatedItem.customization,
          processingTime:updatedItem.processingTime,
           stockStatus:updatedItem.stockStatus,            userName:updatedItem.userName,
           userEmail:updatedItem.userEmail
    }
  }
  const result = await itemCollection.updateOne(filter, update, options);
  res.send(result)
})

app.delete("/Items/:id", async(req, res)=>{
  const id = req.params.id;
  const query = {_id : new ObjectId(id)}
  const result = await itemCollection.deleteOne(query)
  res.send(result)
})

  
 
   
  } finally {
  
    // await client.close();
  }
}
run().catch(console.dir);





app.get('/', (req, res)=>{
    res.send("fabric website is running out")
})






app.listen(port, ()=>{
    console.log(`Right Now Running Port :"${port}`);
})