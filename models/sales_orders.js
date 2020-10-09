'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SalesOrders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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