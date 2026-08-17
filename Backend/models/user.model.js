const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    fullName: {
        firstName: {
            type: String,
            required: true,
            minlength: [3, "First name must be at least 3 characters long"],
            maxlength: [50, "First name cannot exceed 50 characters"],
        },

        lastName: {
            type: String,
            minlength: [3, "Last name must be at least 3 characters long"],
            maxlength: [50, "Last name cannot exceed 50 characters"],
        },
    },

    email: {
        type: String,
        required: true,
        unique: true,
        minlength: [5, "Email must be at least 5 characters long"],
    },

    password: {
        type: String,
        required: true, 
        select: false,
    },

    socketId: {
        type: String,
    },
});


// Generate JWT
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign(
        { _id: this._id },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
    );

    return token;
};


// Compare password
userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
};


// Hash password
userSchema.statics.hashPassword = async function (password) {
    return await bcrypt.hash(password, 10);
};


const userModel =
    mongoose.models.user || mongoose.model("user", userSchema);

module.exports = userModel;