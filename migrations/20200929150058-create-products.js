'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      sku: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      description: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      product_status_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'product_statuses',
          key:'id'
        }
      },
      regular_price: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      discount_price: {
        type: Sequelize.DECIMAL
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      taxable: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('products');
  }
};