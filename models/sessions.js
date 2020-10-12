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
      Sessions.belongsTo(models.SalesOrders, {
        as: 'sales_orders',
        foreignKey: 'session_id'
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