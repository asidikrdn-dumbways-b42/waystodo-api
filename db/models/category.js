"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Category.belongsTo(models.User, {
        foreignKey: "userId",
      });
      Category.hasMany(models.Todo, {
        foreignKey: "categoryId",
      });
    }
  }
  Category.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        // field: "user_id",
      },
      categoryName: {
        type: DataTypes.STRING,
        // field: "category_name",
      },
      bgColor: {
        type: DataTypes.STRING,
        // field: "bg_color",
      },
    },
    {
      sequelize,
      modelName: "Category",
      underscored: true,
    }
  );
  return Category;
};