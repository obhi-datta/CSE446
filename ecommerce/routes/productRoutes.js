const express = require("express");
const router = express.Router();
const Product = require("../model/productModel");
const createHash = require("hash-generator");
const{auth} =require("../auth/middleware")
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination: './uploads/', // Upload directory
    filename: (req, file, cb) => {
      // Generate a unique filename for the uploaded file
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    },
  });
  
  const upload = multer({ storage: storage });

router.post('/add',upload.single('image'),async(req,res)=>{
    console.log(req.body)
    const {name, description,price,quantity,seller,image} = req.body;
    console.log(seller)
    console.log(image)
    const imagePath = req.file.path; // Path to the uploaded image
    console.log(imagePath)
    const productInfo = new Product({
        name, price, quantity, description, seller,image:imagePath
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
