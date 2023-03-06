"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User, {
        foreignKey: "userId",
        as: "user", // untuk object key ketika mempreload user di data todo
      });
      Todo.belongsTo(models.Category, {
        foreignKey: "categoryId",
        as: {
          // untuk object key ketika mempreload category di data todo
          singular: "category", //
          plural: "categories",
        },
      });
    }
  }
  Todo.init(
    {
      userId: {
        type: DataTypes.INTEGER,
        // field: "user_id",
      },
      categoryId: {
        type: DataTypes.INTEGER,
        // field: "category_id",
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      status: DataTypes.BOOLEAN,
      bgColor: {
        type: DataTypes.STRING,
        // field: "bg_color",
      },
      date: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Todo",
      underscored: true,
      paranoid: true,
    }
  );
  return Todo;
};
