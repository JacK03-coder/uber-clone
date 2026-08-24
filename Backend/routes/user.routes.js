const express = require("express");
const router = express.Router();
const { body } = require("express-validator");  
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware")


//  register user route 
router.post(
  "/register",
  [
    body("email").isEmail().withMessage("Invalid email adresss"),
    body("fullName.firstName")
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    body("fullName.lastName")
      .notEmpty()
      .isLength({ min: 3 })
      .withMessage("Last name must be at least 3 characters long"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  userController.registerUser,
)

//Login user route 
router.post("/login" , 
  [
    body("email").isEmail().withMessage("Invalid email adresss"),
    body("password").isLength({min: 6}).withMessage("Password must be at least 6 characters long")
  ],
  userController.loginUser
);
 
//user Profile route
router.get('/profile' , authMiddleware.authUser,  userController.getUserProfile);


// user logout route
router.post('/logout' , authMiddleware.authUser , userController.logoutUser);


module.exports = router;