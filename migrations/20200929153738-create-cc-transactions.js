'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('cc_transactions', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:'sales_orders',
          key:'id'
        }
      },
      transdate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      processor: {
        type: Sequelize.STRING,
      },
      processor_trans_id: {
        type: Sequelize.STRING
      },
      amount: {
        type: Sequelize.DECIMAL,
        allowNull: false
      },
      cc_num: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cc_type: {
        type: Sequelize.STRING,
        allowNull: false
      },
      responde: {
        type: Sequelize.TEXT,
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
    await queryInterface.dropTable('cc_transactions');
  }
};