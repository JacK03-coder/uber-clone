const { validationResult } = require("express-validator");
const captainModel = require("../models/captain.model");
const captainService  = require("../services/captain.service");

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
