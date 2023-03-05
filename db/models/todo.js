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
      Todo.belongsTo(models.User, { foreignKey: "userId" });
      Todo.belongsTo(models.Category, { foreignKey: "categoryId" });
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
    }
  );
  return Todo;
};
