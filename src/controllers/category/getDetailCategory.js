const status = require("http-status");
const { User, Category } = require("../../../db/models");

const getDetailCategory = async (req, res) => {
  try {
    const id = req.params.id;

    // const query =
    //   "SELECT * FROM categories LEFT JOIN users ON users.id = categories.user_id WHERE categories.id = ?";
    // const [category, metadata] = await db.sequelize.query(query, {
    //   replacements: [id],
    // });

    const category = await Category.findOne({
      where: {
        id,
      },
      include: {
        model: User,
        as: "user",
        attributes: { exclude: ["createdAt", "updatedAt", "password", "deletedAt"] },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "deletedAt"],
      },
    });

    // send to response
    res.status(status.OK).json(category);
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = getDetailCategory;
