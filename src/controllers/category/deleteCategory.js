const status = require("http-status");
const { Category } = require("../../../db/models");

const deleteCategory = async (req, res) => {
  try {
    await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    res
      .status(status.OK)
      .json({ message: "Category with id " + req.params.id + " was deleted" });
  } catch (err) {
    res.status(status.INTERNAL_SERVER_ERROR).json({ message: err.message });
  }
};

module.exports = deleteCategory;
