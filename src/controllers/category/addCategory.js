const status = require("http-status");
const { Category } = require("../../../db/models");
const joi = require("joi");

const addCategory = async (req, res) => {
  try {
    // create validator
    const schema = joi.object({
      categoryName: joi.string().required(),
      bgColor: joi.string().required(),
    });

    // validate request
    const { error } = schema.validate(req.body);
    if (error) {
      throw error;
    }

    // insert into database
    const category = await Category.create({
      userId: req.userData.id,
      categoryName: req.body.categoryName,
      bgColor: req.body.bgColor,
    });
    res.status(status.CREATED).json({
      id: category.id,
      userId: category.userId,
      categoryName: category.categoryName,
      bgColor: category.bgColor,
    });
  } catch (err) {
    res.status(status.BAD_REQUEST).json({ message: err.message });
  }
};

module.exports = addCategory;
