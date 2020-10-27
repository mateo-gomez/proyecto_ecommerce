'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductStatuses extends Model {
    static associate(models) {
      ProductStatuses.hasMany(models.Products, {
        as: 'Products',
        foreignKey: 'id',
      })
    }
  };
  ProductStatuses.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'ProductStatuses',
    tableName: 'product_statuses'
  });
  return ProductStatuses;
};