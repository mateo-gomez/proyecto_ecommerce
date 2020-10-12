'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coupons extends Model {
    static associate(models) {
      Coupons.belongsTo(models.SalesOrders, {
        as: 'sales_orders',
        foreignKey: 'coupon_id'
      })
    }
  };
  Coupons.init({
    code: DataTypes.STRING,
    description: DataTypes.STRING,
    active: DataTypes.BOOLEAN,
    value: DataTypes.INTEGER,
    multiple: DataTypes.BOOLEAN,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Coupons',
    tableName: 'coupons'
  });
  return Coupons;
};