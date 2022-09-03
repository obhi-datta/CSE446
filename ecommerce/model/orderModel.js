const {Schema, model} = require("mongoose");
const createHash = require('hash-generator');
const hashLength = 6;


const orderInfoSchema = Schema({
    order:String,    
    user:String,     
    // orders:[
    //     {
    //         seller:String,
    //         productID:String,
    //         quantity:String,
    //         price:Number,
    //         name:String
    //     }
    // ],
    transactionID:String,
    sellerTransactionID:String,
    delivered:{
        type:Boolean,
        default:false
    },
    shippingAddress:String,
    seller:String
})



orderInfoSchema.statics.changeStatus = async function(orderID){
    const result=await orderList.findOne({orderID})
    result.statusProcessing=false;
    result.statusDelivered=true;
    await result.save()
}


const Order = model('Order',orderInfoSchema);
module.exports = Order;