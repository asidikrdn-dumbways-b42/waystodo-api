const status = require("http-status");
const { User, Category } = require("../../../db/models");

const findAllCategoryByUser = async (req, res) => {
  try {
    const userId = req.userData.id;

    // get data from database
    const categories = await Category.findAll({
      where: { userId },
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

    // send to response
    res.status(status.OK).json(categories);
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = findAllCategoryByUser;
