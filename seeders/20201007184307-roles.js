'use strict';

const roles = [{
  name: 'Administrador',
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: 'Cliente',
  createdAt: new Date(),
  updatedAt: new Date()
}]

module.exports = {
  up: async (queryInterface, Sequelize) => {
   await queryInterface.bulkInsert('roles', roles, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('roles', null, {});
  }
};
