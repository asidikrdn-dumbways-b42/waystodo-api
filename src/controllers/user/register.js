const bcrypt = require("bcrypt");
const db = require("../../database/connection");
const { User } = require("../../../db/models");
const status = require("http-status");

const register = async (req, res) => {
  try {
    // get data from request body
    const { fullName, email, password, phone } = req.body;

    // check is user already registered
    const isUserRegistered = await User.findOne({
      where: { email },
    });
    if (isUserRegistered) {
      throw new Error("User already registered");
    }

    // hashing password
    let hashedPassword = await bcrypt.hash(password, 10);
    if (typeof hashedPassword !== "string") {
      throw new Error("Error while hashing password");
    }

    // insert user to database
    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phone,
    });
    // const user = await users.create({
    //   full_name: fullName,
    //   email: email,
    //   password: hashedPassword,
    //   phone: phone,
    // });

    res.status(status.CREATED).json({
      message: "User registered successfully",
      user: {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports = register;
