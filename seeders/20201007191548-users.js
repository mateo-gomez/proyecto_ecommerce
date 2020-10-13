'use strict';

const users = require("../models/users");

const user = [{
    email: 'ejemplo@gmail.com',
    first_name: 'Carlos',
    last_name: 'Alvarez',
    active: true,
    password: 'lapassword',
    token : 'h4kfg27rjd',
    createdAt: new Date(),
    updatedAt: new Date()
},
{
  email: 'ejemplo2@gmail.com',
  first_name: 'Pedro',
  last_name: 'Pelaez',
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
