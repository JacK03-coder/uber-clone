const express = require("express");
const router = express.Router();
const captainController = require("../controllers/captain.controller");
const { body } = require("express-validator");
const authmiddleware = require("../middlewares/auth.middleware");

router.post("/register",
  [
    body("email").notEmpty().withMessage("Invalid email address"),
    body("fullName.firstName")
      .isLength({ min: 3 })
      .withMessage("first name must be 3 chracters long"),
    body("fullName.lastName")
      .isLength({ min: 3 })
      .withMessage("last name must ne 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be 6 character long"),
    body("vehicle.color")
      .isLength({ min: 3 })
      .withMessage("color must be at least 3 characters long"),
    body("vehicle.plate")
      .isLength({ min: 3 })
      .withMessage("plate must be at least 3 chracter long"),
    body("vehicle.capacity")
      .isInt({ min: 1 })
      .withMessage("capacity must at least 1"),
    body("vehicle.vehicleType")
      .isIn(["car", "motorcycle", "auto"])
      .withMessage("Invalid vehicle type"),
  ],
  captainController.registerCaptain,
);

router.post("/login",
  [
    body("email").isEmail().withMessage("invalid email address"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("password must be at least 6 chracter long"),
  ],
  captainController.loginCaptain,
);


router.get('/profile', authmiddleware.authCaptain, captainController.getCaptainProfile);

router.post('/logout' , authmiddleware.authCaptain , captainController.logoutCaptain);

module.exports = router;
