'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesOrders extends Model {
    static associate(models) {
      SalesOrders.hasOne(models.Coupons, {
        as: 'coupons',
        foreignKey: 'coupon_id'
      })
      SalesOrders.belongsTo(models.Sessions, {
        as: 'sessions',
        foreignKey: 'session_id'
      })
      SalesOrders.belongsTo(models.Users, {
        as: 'users',
        foreignKey: 'user_id'
      })
      SalesOrders.hasMany(models.CCTransactions, {
        as: 'cc_transactions',
      })
      SalesOrders.hasMany(models.OrderProducts, {
        as: 'order_products',
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