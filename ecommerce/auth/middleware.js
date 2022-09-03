const jwt = require("jsonwebtoken");
const User = require("../model/userModel");

auth = async (req, res, next) => {
  //console.log(req.headers.cookie)
  // const authToken =  req.headers.cookie.split("=")[1];
  const authToken = req.body.cookie
  const decodedID = jwt.verify(authToken, process.env.SECRET);
  const userInfo = await User.find({
    _id: decodedID._id,
    "authTokens.authToken": authToken,
  });
  //console.log(userInfo)
  if (!userInfo) throw new Error("Please authenticate");
  req.user = userInfo[0];
  next();
};

module.exports = { auth };
