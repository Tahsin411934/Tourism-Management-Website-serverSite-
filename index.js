const express = require('express');
const cors = require('cors');
const tourist = require('./tourist.json');
const app = express();
const port = 5000;

app.use(cors())

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