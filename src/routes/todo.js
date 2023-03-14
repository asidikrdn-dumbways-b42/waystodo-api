// const addTodo = require("../controllers/todo/addTodo");
// const findAllTodosByUser = require("../controllers/todo/findAllTodosByUser");
// const getDetailTodoByUser = require("../controllers/todo/getDetailTodoByUser");
const {
  findAllTodosByUser,
  getDetailTodoByUser,
  addTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todo");
const userAuth = require("../middleware/userAuth");

const todo = (router) => {
  router.get("/todos", userAuth, findAllTodosByUser);
  router.get("/todo/:id", userAuth, getDetailTodoByUser);
  router.post("/todos", userAuth, addTodo);
  router.patch("/todo/:id", userAuth, updateTodo);
  router.delete("/todo/:id", userAuth, deleteTodo);
};

module.exports = todo;
