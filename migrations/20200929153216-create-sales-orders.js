'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('sales_orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_date: {
        type: Sequelize.DATEONLY
      },
      total: {
        type: Sequelize.DECIMAL
      },
      coupon_id: {
        type: Sequelize.INTEGER,
        references: {
          model:'coupons',
          key:'id'
        }
      },
      session_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'sessions',
          key:'id'
        }
      },
      user_id: {
        type: Sequelize.INTEGER,
        references:{
          model:'users',
          key:'id'
        }
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
    await queryInterface.dropTable('sales_orders');
  }
};