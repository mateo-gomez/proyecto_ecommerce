const {Users, Roles, UserRoles} = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {generateToken} = require('./auth')


const register = async (req, res) => {
        
    let {email,first_name,last_name, password} = req.body
    const userExist = await Users.findOne({where:{email: email}})

    if (userExist) {

        res.status(400).json({
            message: 'Usuario Ya Registrado'
        })
    
    } else {
        
        const encryptedPassword = bcrypt.hashSync(password,10)
        const user = await Users.create({
            email,
            first_name,
            last_name,
            active: true,
            password: encryptedPassword,
            token: generateToken(10),
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const roleDefault = await Roles.findOne({where: {name: 'Cliente'}})
        const userRole = await UserRoles.create({
            user_id: user.id,
            role_id: roleDefault.id,
            createdAt: new Date(),
            updatedAt: new Date()
        })

        res.json({message: "Usuario fue agregado correctamente"})

    }
    
}

const findAll = async (_,response) => {

    const users = await Users.findAll({
        include: [{
            model: Roles,
            as: 'roles',
            required: false,
            attributes: ['id', 'name'],
            through: { attributes: []}
        }]
    });
    response.json(users)

}

const findOne = async (request,response) => {
    
    const userId = request.params.id
    const users = await Users.findOne({ 
        where: {id:userId},
        include: [{
            model: Roles,
            as: 'roles',
            required: false,
            attributes: ['id', 'name'],
            through: { attributes: []}
        }]
    });
    response.json(users)

}

const deactivate = async (request, response) => {

    let userId = Number(request.params.id);
    let decoded = jwt.verify(request.token, process.env.SECRET_WORD)
    try {

        if (decoded.id !== userId) {
            
            let user = await Users.update({active:false},{where: {id: userId}});
            response.json({
                message: "La cuenta ha sido desactivada",
                currentAccountId: decoded.id,
                accountDeletedId: userId
            });
        } else {
            response.json({message:"No es posible desactivar la cuenta actual"})
        }

    } catch (error) {
        response.status(400).json({
            error
        })
    }
}

const update = async (request, response) => {
    let userId = request.params.id;
    let {first_name, last_name, email, active, token, password} = request.body;
    try{
        const encryptedPassword = bcrypt.hashSync(password,10)
        const users = await Users.update({
            first_name,
            last_name,
            email,
            active,
            token,
            password: encryptedPassword,
            updated_at: new Date()
        }, { returning: true, where: {id: userId} });
        const user = users[1][0].dataValues;
        response.json({
            message: "Informacion de usuario actualizada",
            users
        });
    }catch(error){
        response.status(400).json({
            message: "No se ha podido actualizar el registro"
        });
    }
}

module.exports = {
    register,
    findAll,
    findOne,
    deactivate,
    update
}