const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/productModel')

const app = express()
app.use(express.json());
app.use(express.urlencoded({extended: false}))
//routes
app.get('/', (req, res)=>{
    res.send('Hello Node API')
})
app.get('/blog', (req, res)=>{
    res.send('Hello Blog, This is after adding Nodemon')
})

app.get('/products', async (req, res)=>{
    try {
        const products = await Product.find({});
        res.status(200).json(products);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

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

app.post('/product', async (req, res)=>{
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message: error.message});
    }
});

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
