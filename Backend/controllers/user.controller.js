const userModel = require("../models/user.model");
const userService = require("../services/user.service");
const { validationResult } = require("express-validator");

module.exports.registerUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const{fullName , email , password} = req.body;

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

  res.status(200).json({token , user});
};