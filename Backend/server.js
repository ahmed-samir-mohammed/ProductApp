const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

// Routers
app.get('/', (req, res) => {
    res.send('Hello')
})

app.get('/product', async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.get('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findById(id)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.post('/product', async (req, res) => {
    try {
        const product = await Product.create(req.body)
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.put('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndUpdate(id, req.body, { new: true })
        !product ? res.status(404).json({ message: `Cannot find any product with ID ${id}` }) : false
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

app.delete('/product/:id', async (req, res) => {
    try {
        const { id } = req.params
        const product = await Product.findByIdAndDelete(id)
        !product ? res.status(404).json({ message: `Cannot find any product with ID ${id}` }) : false
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

mongoose.connect('mongodb+srv://ahmed:ahmed@ahmedblog.6s2hdua.mongodb.net/Node-API?retryWrites=true&w=majority').then(() => {
    app.listen(3000, () => {
        console.log(`Node API App is running or port 3000`)
    })

}).catch(err => console.log(err))