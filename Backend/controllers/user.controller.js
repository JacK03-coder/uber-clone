const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");
const cookieParser = require("cookie-parser");
const blacklisttokenModel = require("../models/blacklisttoken.model");


 // Register user controller 
module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const{fullName , email , password} = req.body;

  const isUserAlreadyExist = await userModel.findOne({email});

  if(isUserAlreadyExist){
    return res.status(400).json({message: "user already exists"});
  }

  try{
    const user = await userService.createUser({
    firstName: fullName.firstName,
    lastName: fullName.lastName,
    email,
    password: password
  });  

  const token = user.generateAuthToken();

  res.status(201).json({token , user});

  }catch(err){
    if(err.code === 11000 ){
        return res.status(400).json({error: "Email already exists"});
    }
    next(err);
  }

};


// login user controller 
module.exports.loginUser = async (req ,res , next) =>{

  const error = validationResult(req);

  if(!error.isEmpty()){
    return res.status(400).json({errors:error.array()});
  }

  const{email , password} = req.body;

  const user = await userModel.findOne({email}).select("+password");

  if(!user){
    return res.status(401).json({message : "Invalid email or password"});
  }

  const isMatch = await user.comparePassword(password);

  if(!isMatch){
    return res.status(401).json({message : "Invalid email or password"});
  }

  const token = user.generateAuthToken();
  res.cookie("token", token);

  res.status(200).json({token , user});
};


 
// user Profile Controller...

module.exports.getUserProfile = async (req,res,next) =>{
  res.status(200).json(req.user);  
}



module.exports.logoutUser = async (req , res , next)  => {

  res.clearCookie('token')
  const token  = req.cookies.token || req.headers.authorization?.split(' ')[1]; 
  await blacklisttokenModel.create({token})
  res.status(200).json({message : "Logout User"});
}