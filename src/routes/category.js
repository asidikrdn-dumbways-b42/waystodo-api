const addCategory = require("../controllers/category/addCategory");
const updateCategory = require("../controllers/category/updateCategory");
const getDetailCategory = require("../controllers/category/getDetailCategory");
const findAllCategoryByUser = require("../controllers/category/findAllCategoryByUser");
const deleteCategory = require("../controllers/category/deleteCategory");
const userAuth = require("../middleware/userAuth");

const category = (router) => {
  router.post("/category", userAuth, addCategory);
  router.patch("/category/:id", userAuth, updateCategory);
  router.get("/category/:id", userAuth, getDetailCategory);
  router.get("/category", userAuth, findAllCategoryByUser);
  router.delete("/category/:id", userAuth, deleteCategory);
};

module.exports = category;
