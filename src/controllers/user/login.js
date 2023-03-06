const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../../../db/models");
const status = require("http-status");

require("dotenv").config();

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });
    if (!user) {
      throw new Error("User not registered");
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw new Error("Wrong password");
    }
    const token = jwt.sign(
      {
        id: user.id,
        fullName: user.fullName,
        email: user.email,
      },
      process.env.JWT_SECRET
    );
    res.status(status.OK).json({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      isEmailVerified: user.isEmailVerified,
      image: user.image,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = login;
