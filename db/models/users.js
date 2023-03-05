'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasMany(models.todos, {
        foreignKey: "user_id",
      });
    }
  }
  users.init({
    full_name: DataTypes.STRING,
    email: DataTypes.STRING,
    is_email_verified: DataTypes.BOOLEAN,
    phone: DataTypes.STRING,
    image: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};