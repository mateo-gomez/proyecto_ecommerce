'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      
    }
  };
  Users.init({
    email: DataTypes.STRING,
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    password: DataTypes.STRING,
    token : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    underscored: true,
  });
  return Users;
};