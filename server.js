const express = require('express');
const mongoose = require('mongoose');
const app = express()

//routes
app.get('/', (req, res)=>{
    res.send('Hello Node API')
})
app.get('/blog', (req, res)=>{
    res.send('Hello Blog, This is after adding Nodemon')
})



mongoose.
connect('mongodb+srv://admin:RBC4jCrtzhRjaXim@db-restfullapinodejs.fcofqdz.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to MangoDB');
    app.listen(3000, ()=>{
        console.log('Node API app is running on port 3000')
    });
}).catch((error)=>{
    console.log(error);
})
