const express = require('express')
const router = express.Router()
const Transaction = require('../model/transactionHistoryModel')
const BankInformation = require('../model/bankInformationModel')


router.post('/add',async(req,res)=>{
    const {accountIn,accountOut,transactionAmount} = req.body;
    console.log(accountIn,accountOut,transactionAmount)
    const createTransaction = new Transaction({
        accountIn,accountOut,transactionAmount
    });
    await createTransaction.transfer(accountIn,accountOut,parseInt(transactionAmount))
    res.send(createTransaction);
})


router.post('/findbytransactionid',async(req,res)=>{
    const {transactionID} = req.body;
    const result  = await Transaction.findOne({transactionID})
    res.send(result)
})

router.post('/findbyac',async(req,res)=>{
    const {acNo} = req.body;
    const result  = await Transaction.find({acNo})
    res.send(result)
})




module.exports=router;
