const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const captainSchema = new mongoose.Schema({
  fullName: {
    firstName: {
      type: String,
      required: true,
      minlength: [3, "first name must be 3 chracters long"],
      maxlength: [50, "first name cannot exceed 50 characters"],
    },

    lastName: {
      type: String,
      required: true,
      minlength: [3, "last name must be 3 characters long"],
      maxlength: [50, "last name cannot exceed 50 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [5, "Email must be 5 chracters long"],
  },
  password: {
    type: String,
    required: true,
    select: true,
  },

  socketId: {
    type: String,
  },

  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active",
  },

  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "color must be at least 3 chracters long"],
    },
    plate: {
      type: String,
      required: true,
      minlength: [3, "plate must be at least 3 character long"],
    },
    capacity: {
      type: Number,
      required: true,
      minlength: [1, "capacity must be at least 1"],
    },

    vehicleType: {
      type: String,
      required: true,
      enum: ["car", "motorcycle", "auto"],
    },
  },

  location: {
    lat: {
      type: Number,
    },
    lng: {
      type: Number,
    },
  },
});

captainSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
};

captainSchema.method.comparePassword = async function (password) {
  return await bcrypt.comparePassword(password, this.password);
};

captainSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};
const captainModel = mongoose.model("captain", captainSchema);

module.exports = captainModel;
