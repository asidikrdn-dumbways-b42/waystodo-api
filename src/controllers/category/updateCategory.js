const status = require("http-status");
const { User, Category } = require("../../../db/models");

const updateCategory = async (req, res) => {
  try {
    // get category by id
    let category = await Category.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!category) {
      throw new Error("category not found");
    }

    // if userId on category is not same as userId that wants to change the category, send error message
    if (category.userId !== req.userData.id) {
      throw new Error("this category is not yours");
    }

    // insert into database
    await Category.update(
      {
        // update categoryName if it exists on request
        categoryName: req.body.categoryName
          ? req.body.categoryName
          : category.categoryName,
        // update bgColor if it exists on request
        bgColor: req.body.bgColor ? req.body.bgColor : category.bgColor,
      },
      {
        where: {
          id: req.params.id,
        },
      }
    );

    // get category by id after updating
    category = await Category.findOne({
      where: {
        id: req.params.id,
      },
      include: {
        model: User,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "password", "deletedAt"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });
    if (!category) {
      throw new Error("category not found");
    }

    res.status(status.OK).json({
      category,
    });
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = updateCategory;
