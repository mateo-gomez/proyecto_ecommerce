'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Roles extends Model {
    static associate(models) {
      Roles.hasMany(models.UserRoles, {foreignKey:'role_id', as: 'user_roles'})
    }
  };
  Roles.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Roles',
    tableName: 'roles'
  });
  return Roles;
};