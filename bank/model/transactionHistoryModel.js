const {Schema,model} = require("mongoose");
const bcryptjs = require("bcryptjs");
const otpGenerator = require("otp-generator");
const BankInformation = require('../model/bankInformationModel');
const createHash = require('hash-generator');
const hashLength = 8;



const transactionSchema=  new Schema({
    accountIn:String,
    accountOut:String,
    transactionAmount:String,
    transactionID:String,
    
})

transactionSchema.methods.transfer = async function(acNoIn,acNoOut,amount){
    const info = this
    const accountInInfo =  await BankInformation.findOne({acNo:acNoIn})
    console.log('acc', accountInInfo, acNoIn)
    const accountOutInfo =  await BankInformation.findOne({acNo:acNoOut})
    console.log('acc bal',accountInInfo.balance)
    accountInInfo.balance =  parseInt(accountInInfo.balance) + parseInt(amount);
    accountOutInfo.balance = parseInt(accountOutInfo.balance) - parseInt(amount);

    await accountInInfo.save()
    await accountOutInfo.save()
    const transactionID = createHash(hashLength);
    info.transactionID = transactionID;
    await info.save()
    
}

const Transaction = model('Transaction',transactionSchema); 
module.exports = Transaction;