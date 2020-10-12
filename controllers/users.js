const Sequelize     = require('sequelize');
const Users       = require('../models').Users;

module.exports = {

    create(req,res){
        return Users
        .create({
            first_name: req.params.first_name,
            email: req.params.email,
            last_name: req.params.last_name,
            active: req.params.active,
            password: req.params.password,
            token : req.params.token,
        })
        .then(usuario=>res.status(200).send(usuario))
        .catch(error=>res.status(400).send(error))
    },

    list(_,res){
        return Users
        .findAll({})
        .then(usuario=> res.status(200).send(usuario))
        .catch(error=> res.status(400).send(error))
    },

    find (req,res){
        return Users
        .findAll({
            where: {
                email: req.params.email
            }
        })
        .then(usuario=> res.status(200).send(usuario))
        .catch(error=> res.status(400).send(error))
    },
}