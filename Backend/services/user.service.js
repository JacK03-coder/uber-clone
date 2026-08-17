const userModel = require("../models/user.Model");

module.exports.createUser = async ({
  firstName,
  lastName,
  email,
  password,
}) => {
  if (!firstName || !lastName || !email || !password) {
    throw new Error("All fields are required");
  }

  const hashPassword = await userModel.hashPassword(password);

  const user = await userModel.create({
    fullName: {
      firstName,
      lastName,
    },
    email,
    password: hashPassword,
  });

  return user;
};
