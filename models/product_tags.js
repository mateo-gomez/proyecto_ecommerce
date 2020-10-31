'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductTags extends Model {
    static associate(models) {
      
    }
  };
  ProductTags.init({
    product_id: DataTypes.INTEGER,
    tag_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ProductTags',
    tableName: 'product_tags'
  });
  return ProductTags;
};