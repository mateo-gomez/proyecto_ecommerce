'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserRoles extends Model {
    static associate(models) {
      UserRoles.belongsTo(models.Users, {
        as: 'users',
        foreignKey: 'user_id'
      })
      UserRoles.belongsTo(models.Roles, {
        as: 'roles',
        foreignKey: 'role_id'
      })
    }
  };
  UserRoles.init({
    user_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserRoles',
    tableName: 'user_roles',
  });
  return UserRoles;
};