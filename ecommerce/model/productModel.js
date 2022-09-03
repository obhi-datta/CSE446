const { Schema, model } = require("mongoose");


const productInfoSchema = new Schema({
  product: String,
  name: String,
  price: Number,
  quantity: Number,
  description: String,
  seller: { 
    type: String,
    required: true,
  },
  image:String
});



const Product = model("Product", productInfoSchema);
module.exports = Product;
