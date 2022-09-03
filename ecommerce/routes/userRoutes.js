const express = require("express");
const cookieParser = require('cookie-parser')
const router = express.Router();
const User = require("../model/userModel");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const{auth} =require("../auth/middleware")

router.post('/',auth,async(req,res)=>{
  res.send({userInfo:req.user})
})

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.find({ email });
  const result = {};
  //console.log(user)
  if (!user.length) {
    result.error = "User Not Found";
    res.send(result);
  } else {
    const [userInfo] = user;
    const passwordMatch = await bcryptjs.compare(password, userInfo.password);
    if (!passwordMatch) {
      result.error = "User Not Found";
      res.send(result);
    } else {
      const authToken = jwt.sign({ _id: userInfo._id }, process.env.SECRET);
      //console.log(authToken)
      userInfo.authTokens = userInfo.authTokens.concat({ authToken });
      await userInfo.save();
      res.cookie("authToken", authToken);
      res.send({ userInfo, authToken });
    }
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password, address, role = "user" } = req.body;
  const cartInfo = [];
  const user = new User({
    name,
    email,
    password,
    address,
    role,
  });
  if(role==='user')
    user.cartInfo=[]
  await user.save();
  //console.log(user)
  res.send(user)
});
router.get("/logout",async (req, res) => {
 
    //console.log(req.user)
    const token = req.headers.authToken;
    const userInfo = req.user;
    userInfo.authTokens = userInfo.authTokens.filter(
      (authToken) => token == authToken.authToken
    );
    res.cookie("authToken", "");
    await userInfo.save();
    res.send({
        success:true
    });
 
});

router.post('/addbankac',auth,async(req,res)=>{
    
  const {acNo}= req.body;
    const user = await User.findOne({email:req.user.email});
    user.acNo=acNo;
    user.verified=true
    //console.log(user)
    await user.save();
    res.send(user);
})


router.post('/cart/add',auth,async(req,res)=>{
    const user = req.user
    const {product,quantity, price, seller, name} = req.body
    const cartObj ={product,price,quantity,seller,name}
    //console.log(cartObj)
    user.cartInfo = user.cartInfo.concat(cartObj);
    await user.save()
    res.send(user)
})

router.post('/cart/delete',auth,async(req,res)=>{
    const user= req.user;
    const {product,seller} = req.body
    //console.log('product id', product)
    user.cartInfo=user.cartInfo.filter((cartItem)=> cartItem.product != product )
    await user.save()
    res.send(user)

})

router.post('/cart/view',auth,async(req,res)=>{
  const user=req.user;
  res.send({cart:user.cartInfo})
})
router.post('/cart/clear',auth,async(req,res)=>{
   const user= req.user;
   //console.log(user);
   user.cartInfo = [];
   await user.save()
   res.send(user)
})


module.exports = router;
