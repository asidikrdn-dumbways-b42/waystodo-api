const { register, login } = require("../controllers/user");

const user = (router) => {
  router.post("/register", register);
  router.post("/login", login);
};

module.exports = user;
