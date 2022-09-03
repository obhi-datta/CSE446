const { Schema, model } = require("mongoose");
const bcryptjs = require("bcryptjs");


const userSchema = new Schema({
  name: String,
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minlength: 8,
    required: true,
  },
  authTokens: [
    {
      authToken: String,
    },
  ],
  acNo: String,
  role: {
    type: String,
    default: "user",
  },
  adress: String,
  cartInfo: [
    {
      product: String,
      quantity: String,
      price: String,
      seller: String,
      name:String
    },
  ],
  verified:{
    type:Boolean,
    default:false
  }

});

userSchema.methods.generateAuth = async function () {
  const user = this;
  
  await user.save();
  return authToken;
};

userSchema.methods.toJSON= function(){
  const user = this;
  const obj = user.toObject()

  delete obj.authTokens;
  return obj
}


userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcryptjs.hash(user.password, 8);
  }
  next();
});

const User = model("User", userSchema);
module.exports = User;
