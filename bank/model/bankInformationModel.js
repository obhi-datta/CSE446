const {Schema,model} = require("mongoose");
const bcryptjs = require("bcryptjs");

const bankInformationSchema =  new Schema({
    name:String,
    acNo:{
        type: String,
        required: true,
        unique: true
    },
    balance: {
        type:String,
        default:"10000"
    },
    pin:String,
    firstVisit:{
        type:Boolean,
        default:true
    }
 
})

bankInformationSchema.statics.verifyPIN = async function (acNo, pin) {
    const bankInfo = await BankInformation.findOne({acNo  });
    if (!bankInfo) return false;
    const result= await bcryptjs.compare(pin, bankInfo.pin)
    return result? true: false;
  };

bankInformationSchema.pre('save', async function (next) {
    const bank = this;
    if (bank.isModified("pin")) {
        bank.pin = await bcryptjs.hash(bank.pin, 12);
    }
    next();
})




const BankInformation = model('BankInformation',bankInformationSchema); 
module.exports = BankInformation;