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
        as: "category",
      });
    }
  }
  Todo.init(
    {
      userId: {
        type: DataTypes.INTEGER,
      },
      categoryId: {
        type: DataTypes.INTEGER,
      },
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      isDone: DataTypes.BOOLEAN,
      bgColor: {
        type: DataTypes.STRING,
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
