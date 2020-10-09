'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {
      UserRoles.belongsTo(models.Users, {foreignKey: 'user_id', as: 'users'})
      
    }
  };
  UserRoles.init({
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserRoles',
    tableName: 'user_roles'
  });
  return UserRoles;
};