"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo, { foreignKey: "userId" });
      User.hasMany(models.Category, { foreignKey: "userId" });
    }
  }
  User.init(
    {
      fullName: {
        type: DataTypes.STRING,
        // field: "full_name",
      },
      email: DataTypes.STRING,
      isEmailVerified: {
        type: DataTypes.BOOLEAN,
        // field: "is_email_verified",
      },
      phone: DataTypes.STRING,
      image: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "User",
      underscored: true,
    }
  );
  return User;
};
