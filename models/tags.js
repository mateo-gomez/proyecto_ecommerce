'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate(models) {
      Tags.belongsToMany(models.Products, {
        through: 'product_tags',
        as: 'products',
        foreignKey: 'product_id'
      })
    }
  };
  Tags.init({
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Tags',
    tableName: 'tags'
  });
  return Tags;
};