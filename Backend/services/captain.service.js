const { model } = require("mongoose");
const captainModel = require("../models/captain.model");
const userModel = require("../models/user.model");

module.exports.createCaptain = async ({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) => {
  if (
    !firstName ||
    !lastName ||
    !email ||
    !password ||
    !color ||
    !plate ||
    !capacity ||
    !vehicleType
  ) {
    throw new Error("All failds are required");
  }

  const captain = await captainModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password,
    vehicle: { color, plate, capacity, vehicleType },
  });

  return captain ;
};
