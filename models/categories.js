'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    static associate(models) {
      Categories.belongsToMany(models.Products, {
        as: 'products',
        through: 'product_categories',
        foreignKey: 'product_id'
      })
    }
  };
  Categories.init({
    name: DataTypes.STRING,
    parent_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Categories',
    tableName: 'categories'
  });
  return Categories;
};