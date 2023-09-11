const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')

//App Configrations 
const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}))


//Routes

//Get requests
//Home Route
app.get('/', (req, res)=>{
    res.send('Hello Node API')
})
//Blog Route
app.get('/blog', (req, res)=>{
    res.send('Hello Blog, This is Node API')
})
//Products Route: List of all products from DB
app.get('/products', async (req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});
//Product By ID Route: get product from DB using its ID
app.get('/products/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//Post Requests
//Product Route: Adding new product to DB, the JSON Object added to request body (using Postman Application)
app.post('/product', async (req, res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//Put Requests
//Products Route: Update product in DB using its ID, the JSON Object, or URL Encoded Information added to request body (using Postman Application)
app.put('/products/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID: ${id}`})
        }
        const updatedProduct = await Product.findById(id);
        res.status(200).json(updatedProduct);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

//Delete Requests
//Product Route: Delete product from DB using its ID
app.delete('/products/:id', async (req, res)=>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id, req.body);
        if(!product){
            return res.status(404).json({message: `cannot find any product with ID: ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});


//Database Configrations: Note the password has been changed for secutiy perposes.
mongoose.
connect('mongodb+srv://admin:RBC4jCrtzhRjaXim@db-restfullapinodejs.fcofqdz.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log('connected to MangoDB');
    //Run the express server after you connected successfully to DB
    app.listen(3000, ()=>{
        console.log('Node API app is running on port 3000')
    });
}).catch((error)=>{
    console.log(error);
})