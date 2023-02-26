const { getAllTodos } = require("../controllers/todo");

const todo = (router) => {
  router.get("/todos", getAllTodos);
  router.get("/todo/:id", (req, res) => {
    res.send("Heloo " + req.params.id);
  });
};

module.exports = todo;
