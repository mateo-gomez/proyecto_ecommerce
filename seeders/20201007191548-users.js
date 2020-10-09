'use strict';

const users = require("../models/users");

const user = [{
    email: 'ejemplo@gmail.com',
    first_name: 'Nombre del ejemplo',
    last_name: 'Apellido del ejemplo',
    active: true,
    password: 'lapassword',
    token : 'h4kfg27rjd',
    createdAt: new Date(),
    updatedAt: new Date()
}]

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', user, {})
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', null, {});
  }
};
