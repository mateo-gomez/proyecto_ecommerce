'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesOrders extends Model {
    static associate(models) {
      SalesOrders.hasMany(models.Coupons, {
        as: 'coupons',
        foreignKey: 'id'
      })
      SalesOrders.hasOne(models.Sessions, {
        as: 'sessions',
        foreignKey: 'id'
      })
      SalesOrders.hasOne(models.Users, {
        as: 'users',
        foreignKey: 'id'
      })
      SalesOrders.belongsTo(models.CCTransactions, {
        as: 'cc_transactions',
        foreignKey: 'order_id'
      })
      SalesOrders.belongsTo(models.OrderProducts, {
        as: 'order_products',
        foreignKey: 'order_id'
      })
    }
  };
  SalesOrders.init({
    order_date: DataTypes.DATE,
    total: DataTypes.INTEGER,
    coupon_id: DataTypes.INTEGER,
    session_id: DataTypes.INTEGER,
    user_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SalesOrders',
    tableName: 'sales_orders'
  });
  return SalesOrders;
};