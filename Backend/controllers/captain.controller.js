const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService  = require("../services/captain.service");
const cookieParser = require("cookie-parser");
const blacklistTokenModel = require("../models/blacklistToken.model");

module.exports.registerCaptain = async (req, res, next) => {
  const error = validationResult(req);

  if (!error.isEmpty()) {
    return res.status(400).json({ error: error.array() });
  }

  const { fullName, email, password, vehicle } = req.body;

  const isCaptainAlreadyExist = await captainModel.findOne({ email });

  if (isCaptainAlreadyExist) {
    return res.status(400).json({ message: "captain already exists" });
  } 

  const hashPassword = await captainModel.hashPassword(password);

  try {
    const captain = await captainService.createCaptain({
      firstName: fullName.firstName,
      lastName: fullName.lastName,
      email,
      password: hashPassword,
      color: vehicle.color,
      plate: vehicle.plate,
      capacity: vehicle.capacity,
      vehicleType: vehicle.vehicleType,
    });
    const token = captain.generateAuthToken();
    res.status(201).json({ token, captain });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(401).json({ error: "Email already exists" });
    }
    next(error);
  }
};

module.exports.loginCaptain = async (req , res , next) =>{
    const error = validationResult(req);

    if(!error.isEmpty()){
        return res.status(400).json({error : error.array()});
    }

    const {email , password} = req.body;
    
    const captain = await captainModel.findOne({email}).select("+password");

    if(!captain){
        return res.status(401).json("invalid email or password");
    }

    const isMatch = await captain.comparePassword(password);

    if(!isMatch){
        return res.status(401).json("invalid email or password") 
    }
    const token = captain.generateAuthToken();
    res.cookie("token", token);
    res.status(200).json({token,captain})
}


module.exports.getCaptainProfile = async (req , res , next) =>{
    res.status(200).json(req.captain);
}

module.exports.logoutCaptain = async (req , res , next) =>{

    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    res.clearCookie('token');

    try {
      await blacklistTokenModel.create({ token });
      res.status(200).json({ message: "Captain logout" });
    } catch (error) {
      next(error);
    }
}
