'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProducts extends Model {
    static associate(models) {
      OrderProducts.belongsTo(models.SalesOrders, {
        as: 'sales_orders',
        foreignKey: 'order_id',
      })
    }
  };
  OrderProducts.init({
    order_id: DataTypes.INTEGER,
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    subtotal: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderProducts',
    tableName: 'order_products'
  });
  return OrderProducts;
};