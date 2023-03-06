const jwt = require("jsonwebtoken");
const status = require("http-status");

const userAuth = async (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      throw new Error("token not found");
    }
    token = token.replace("Bearer ", "");

    jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
      if (err) {
        throw err;
      }
      req.userData = payload;
    });

    next();
  } catch (err) {
    res.status(status.UNAUTHORIZED).json({
      message: err.message,
    });
  }
};

module.exports = userAuth;
