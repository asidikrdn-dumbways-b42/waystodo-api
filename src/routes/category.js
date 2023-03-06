const {
  addCategory,
  updateCategory,
  findAllCategoryByUser,
  getDetailCategory,
  deleteCategory,
} = require("../controllers/category");
const userAuth = require("../middleware/userAuth");

const category = (router) => {
  router.post("/category", userAuth, addCategory);
  router.patch("/category/:id", userAuth, updateCategory);
  router.get("/category/:id", userAuth, getDetailCategory);
  router.get("/category", userAuth, findAllCategoryByUser);
  router.delete("/category/:id", userAuth, deleteCategory);
};

module.exports = category;
