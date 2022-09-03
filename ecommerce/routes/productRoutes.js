const express = require("express");
const router = express.Router();
const Product = require("../model/productModel");
const createHash = require("hash-generator");
const{auth} =require("../auth/middleware")


router.post('/add',async(req,res)=>{
    const {name, description,price,quantity,seller,image} = req.body;
    //console.log(seller)
    const productInfo = new Product({
        name, price, quantity, description, seller,image
    });
    productInfo.product = createHash(8);
    
    await productInfo.save()
    //console.log(productInfo)
    res.send(productInfo)
}) 


router.post('/stock-update',async(req,res)=>{
    const {product,quantity} = req.body;
    const productInfo = await Product.findOne({product});
    productInfo.quantity = parseInt(productInfo.quantity) - parseInt(quantity);
    await productInfo.save()
    res.send(productInfo)
})

router.get('/allproduct',async (req,res)=>{
    const products = await Product.find({});
    res.send(products)
})

router.post('/oneproduct',async(req,res)=>{
    const {product} = req.body
    const productInfo = await Product.findOne({product})
    res.send(productInfo)
})



module.exports = router;
