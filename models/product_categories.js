'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductCategories extends Model {
    static associate(models) {
      ProductCategories.belongsTo(models.Categories, {
        as: 'categories',
        foreignKey: 'category_id'
      })
    }
  };
  ProductCategories.init({
    category_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductCategories',
    tableName: 'product_categories'

  });
  return ProductCategories;
};