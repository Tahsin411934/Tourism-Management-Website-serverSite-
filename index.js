const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()
const tourist = require('./tourist.json');
const app = express();
const port =process.env.PORT || 5000;

app.use(cors())
app.use(express.json())





const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2vutuar.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();
    const touristSpots = client.db("touristSpotsDB").collection("AddedTouristSpots");
     
    app.get("/touristSpotByEmail/:email", async (req, res) => {
      const email = req.params.email;
      const query = { email: email }; 
      const result = await touristSpots.find(query).toArray();
      res.send(result);
    });
    app.get("/touristSpot/:id1",async(req,res)=>{
      const id1= req.params.id1;
      const quary = {_id: new ObjectId(id1)}
        const result= await touristSpots.findOne(quary);
        res.send(result)
    })



     app.get("/touristSpot",async(req,res)=>{
        const cursor= touristSpots.find();
        const result= await cursor.toArray();
        res.send(result)
    })
  

    app.post("/touristSpot",async(req,res)=>{
        const touristSpot= req.body;
        const result= await touristSpots.insertOne(touristSpot)
        res.send(result)
    })
   
    app.delete("/touristSpot/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: new ObjectId(id) };
        const result = await touristSpots.deleteOne(query);
        res.send(result)
    })
    
  app.put("/touristSpot/:id",async (req, res) => {
    const id = req.params.id;
    const tourist_Spot= req.body;
    console.log(id,tourist_Spot)
    const filter = { _id: new ObjectId(id) };
    const options = {upset: true};
    const updateSpot = {
      $set: {
        country_name: tourist_Spot.country_name,
        average_cost: tourist_Spot.average_cost
      }
    }
    const result = await touristSpots.updateOne(filter,updateSpot,options);
    res.send(result)
})

  
    // Send a ping to confirm a successful connection
    // await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);



app.get("/", (req,res)=>{
    res.send("this home page")
})
app.get("/tourist", (req,res)=>{
    res.send(tourist)
})
app.get("/tourist/:id", (req,res)=>{
    const id= req.params.id;
    const singleTourist= tourist.find(t=> t.id==id)
    console.log(id)
    res.send(singleTourist)
})

app.listen(port, ()=>{
    console.log(`my data server is running on port: ${port}`)
})