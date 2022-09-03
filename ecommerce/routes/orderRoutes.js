const express = require("express");
const router = express.Router();
const Order = require("../model/orderModel");
const createHash = require("hash-generator");
const{auth} =require("../auth/middleware")


router.post('/add',auth,async(req,res)=>{
    const {transactionID,seller,sellerTransactionID} = req.body;
    ///orders is an array of orders
    const orderInfo=  new Order({
        user : req.user.email,
        // orders,
        transactionID,
        shippingAddress:req.user.address,
        seller,
        sellerTransactionID
    })
 
    orderInfo.order = createHash(8);
    //console.log(orderInfo)
    await orderInfo.save()
    res.send(orderInfo)
})

router.post('/show',async(req,res)=>{
    const {user} = req.body;
    const  result = await Order.find({user});
    res.send(result)
})

router.get('/show',async(req,res)=>{
    const result = await Order.find({})
    res.send(result)
})

router.post('/showone',async (req,res)=>{
    const {order} = req.body
    const result = await Order.findOne({order})
    res.send(result)
})



router.post('/status',async(req,res)=>{
    const {order} = req.body
    console.log(order)
    const orderInfo = await Order.findOne({order})
    orderInfo.delivered= true;
    await orderInfo.save()
    res.send(orderInfo)
})

router.post('/seller',async(req,res)=>{
    const {seller} = req.body
    const orderInfo = await Order.find({seller})    
    res.send(orderInfo)
})

router.get('/view',async(req,res)=>{
    const result = await Order.find({})
    //const result = await Order.collection.drop()
    res.send(result)
})





module.exports = router;
