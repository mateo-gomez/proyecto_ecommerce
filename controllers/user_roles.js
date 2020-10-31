const {UserRoles, Users, Roles} = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op

const addUserRoles = async(req, res)=>{

    try {

        const {email, role} = req.body
        const user_ = await Users.findOne({where:{email: email}})
        const role_ = await Roles.findOne({where: {name: role}})

        const userRole = await UserRoles.findOne({where: {
            [Op.and]: [{user_id: user_.id}, {role_id: role_.id}]
        }})

        if(userRole){
            res.json({
                message: "Usuario Ya Tiene Role"
            })
        }else{

            if (user_&&role_) {
                const set = await UserRoles.create({
        
                    user_id: user_.id,
                    role_id: role_.id,
                    createdAt: new Date(),
                    updatedAt: new Date()
        
                })
                res.json({
                    message: "Se registró correctamente", set
                })
            }
        }    
        
    } catch (error) {
        res.json({
            message: "Las Credenciales son incorrectas"
        })
    }
}

const deletUserRoles = async(req,res)=>{
    
    try {
        
        const {email, role} = req.body
        const user_ = await Users.findOne({where:{email: email}})
        const role_ = await Roles.findOne({where: {name: role}})

        const userRole = await UserRoles.findOne({where: {
            [Op.and]: [{user_id: user_.id}, {role_id: role_.id}]
        }}) //Role de usuario que coincide con el request

        if (userRole) {
            await userRole.destroy()
            res.json({
                message: "Role de usuario borrado"
            })
        }else{
            res.json({
                message: 'No existe role de usuario'
            })
        }

    } catch (error) {
        res.json({
            message: 'Error en la petición'
        })
    }

}

const updateUserRoles = async(req,res)=>{
    
    try {
        
        const {email, role} = req.body
        const user_ = await Users.findOne({where:{email: email}})
        const role_ = await Roles.findOne({where: {name: role}})
        //Encontrando rol de usuario con el user_id
        const userRole = await UserRoles.findOne({where:{
            user_id: user_.id
        }}) //Role de usuario que coincide con el request

        if (userRole) {
            
            await UserRoles.update({
                user_id: user_.id,
                role_id: role_.id,
                updatedAt: new Date()
            }, { where: { id: userRole.id}})
            res.json({
                message: "Registro Actualizado"
            })

        } else {
            res.json({
                message: "Credenciales no encontradas"
            })
        }

    } catch (error) {
        res.json({
            message: 'Credenciales incorrectas'
        })
    }
    
}

module.exports = {
    addUserRoles,
    deletUserRoles,
    updateUserRoles
}