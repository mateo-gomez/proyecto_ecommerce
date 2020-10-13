'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      Users.belongsToMany(models.Roles, {
        as: 'roles',
        through: 'user_roles',
        foreignKey: 'user_id'
      })
     Users.hasMany(models.SalesOrders, {
       as: 'sales_orders',
     })
      
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
  });
  return Users;
};