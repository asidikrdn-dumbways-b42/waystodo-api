const user = (router) => {
  router.get("/users", (req, res) => {
    res.send("Heloo gaes, ini halaman user");
  });
};

module.exports = user;
