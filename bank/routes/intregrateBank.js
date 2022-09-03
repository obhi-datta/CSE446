const express = require('express')
const router = express.Router()
const BankInformation = require('../model/bankInformationModel')

router.post('/', async (req, res) => {
    const { acNo, amount } = req.body;
    const acInfo = await BankInformation.findOne({ acNo })
    if (parseInt(acInfo.balance) >= parseInt(amount)) {
        res.send({ result: true ,
            acInfo
        })
    } else {
        res.send({ result: false })
    }
}) 

router.post('/intrigate', async (req, res) => {
    const { acNo, pin, name } = req.body;
    //console.log("bank call", name)
    const bankIn = new BankInformation({
        acNo, pin, name
    });
    await bankIn.save();
    res.send(bankIn)
})

router.post('/pin', async (req, res) => {
    const { pin, acNo } = req.body;
    console.log(pin, acNo)
    const result = await BankInformation.verifyPIN(acNo, pin);
    console.log(result)
    res.send(result)
})

router.get('/',async(req,res)=>{
    const result = await BankInformation.find({})
    res.send(result)
})



module.exports = router;
