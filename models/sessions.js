'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sessions extends Model {
    static associate(models) {
      Sessions.belongsTo(models.Users, {
        as: 'users',
        foreignKey: 'id'
      })
      Sessions.hasMany(models.SalesOrders, {
        as: 'sales_orders',
      })
    }
  };
  Sessions.init({
    data: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Sessions',
    tableName: 'sessions'
  });
  return Sessions;
};