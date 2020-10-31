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

const findAll = async (req,res) => {

    try {

        const getPagination = (page, size) => {
            const limit = size ? +size : 3;
            const offset = page ? page * limit : 0;
            return { limit, offset };
        };
    
        const getPagingData = (data, page, limit) => {
            const { count: totalItems, rows: users } = data;
            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);
            return { totalItems, users, totalPages, currentPage };
        };
    
        const { page, size, total } = req.query;
        var condition = total ? { total } : null;
    
        const { limit, offset } = getPagination(page, size);
    
        await Users.findAndCountAll({ where: condition, limit, offset,
            include: [{
                model: Roles,
                as: 'roles',
                required: false,
                attributes: ['id', 'name'],
                through: { attributes: []}
            }]
        })
        .then(data => {
            const response = getPagingData(data, page, limit);
            res.send(response);
        })
        .catch(err => {
            res.status(500).send({
                message:
                err.message || "Some error occurred while retrieving tutorials."
            });
        });
        
    } catch (error) {

        res.json({
            message: 'Error en la peticion',
            error:error.message
        })
        
    }

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