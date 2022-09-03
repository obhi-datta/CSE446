const express = require('express');
require('dotenv').config()
const app= express();
const mongoose = require('mongoose')
mongoose.connect(process.env.MONGO_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("ecommerce database successful")
}).catch(()=>{
    console.log("ecommerce database failed")
})


const userRoutes=  require('./routes/userRoutes')
const productRoutes=  require('./routes/productRoutes')
const orderRoutes = require('./routes/orderRoutes')

const cors = require('cors') 
app.use(cors())
const port = process.env.port || 4001;
app.use(express.json()); 


app.use('/user',userRoutes)
app.use('/product',productRoutes);
app.use('/order',orderRoutes)





app.listen(port,()=>{
    console.log(`ecommerce running on port ${port}`);
})