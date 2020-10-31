'use strict';

const users = [{
  email: "luisvittory@gmail.com",
  first_name: "Luis",
  last_name: "Gutierrez",
  password: '$2a$10$fxSAHHYZiV6kMBs0y1fiU.rnQ/6cqZ77iiCAmVfHHzF4fwB5v4ETK',
  token: 'asdfg',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  email: "motokoviloria@gmail.com",
  first_name: "Alberto",
  last_name: "Gutierrez",
  password: '$2a$10$fxSAHHYZiV6kMBs0y1fiU.rnQ/6cqZ77iiCAmVfHHzF4fwB5v4ETK',
  token: 'spoqe',
  active: true,
  createdAt: new Date(),
  updatedAt: new Date()
}];

const roles = [{
  name: "Administrador",
  createdAt: new Date(),
  updatedAt: new Date()
},
{
  name: "Cliente",
  createdAt: new Date(),
  updatedAt: new Date()
}];

let userRoles = [{
    user_id: 2,
    role_id: 6, 
    createdAt: new Date(),
    updatedAt: new Date()
},
{
  user_id: 2,
  role_id: 6, 
  createdAt: new Date(),
  updatedAt: new Date()
}];

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
    let rolesR = await queryInterface.bulkInsert('roles', roles, {returning: true});
    let usersR = await queryInterface.bulkInsert('users', users, {returning: true});

    let {id: adminId_0} = rolesR.find( role => role.name === 'Administrador');
    // let adminId = rolesR.find( role => role.name === 'Administrador').id;
    let {id: userId_0} = usersR.find( user => user.email === 'luisvittory@gmail.com');
    // let userId = usersR.find( user => user.email === 'luis20@gmail.com').id;
    let {id: adminId_1} = rolesR.find( role => role.name === 'Cliente');
    let {id: userId_1} = usersR.find( user => user.email === 'motokoviloria@gmail.com');
    
    userRoles[0].user_id = userId_0;
    userRoles[0].role_id = adminId_0;

    userRoles[1].user_id = userId_1;
    userRoles[1].role_id = adminId_1;

    let userRolesR = await queryInterface.bulkInsert('user_roles', userRoles, {returning: true});
    //console.log(rolesR, usersR, userRolesR);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_roles', null, {});
    await queryInterface.bulkDelete('roles', null, {});
    await queryInterface.bulkDelete('users', null, {});
  }
};
