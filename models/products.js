'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    static associate(models) {
      Products.belongsToMany(models.Categories, {
        as: 'categories',
        through: 'product_categories',
        foreignKey: 'product_id',
      })
      Products.belongsTo(models.ProductStatuses, {
        as: 'status',
        foreignKey: 'product_status_id'
      })
      Products.belongsToMany(models.Tags, {
        as: 'tags',
        through: 'product_tags',
        foreignKey: 'product_id'
      })
    }
  };
  Products.init({
    sku: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    product_status_id: DataTypes.INTEGER,
    regular_price: DataTypes.INTEGER,
    discount_price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    taxable: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Products',
    tableName: 'products'
  });
  return Products;
};