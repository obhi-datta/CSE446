const express = require('express');
require('dotenv').config()
const app= express();
const mongoose = require('mongoose')
const bankRoute = require('./routes/intregrateBank')
const transactionRoute = require('./routes/transactionRoute')

mongoose.connect(process.env.MONGO_URL,{ 
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(()=>{
    console.log("bank database successful")
}).catch(()=>{
    console.log("bank database failed")
})

const cors = require('cors') 
app.use(cors())
const port = process.env.port || 4000;
app.use(express.json()); 
app.use('/bank',bankRoute)
app.use('/transaction',transactionRoute)

app.listen(port,()=>{
    console.log(`bank running on port ${port}`);
})