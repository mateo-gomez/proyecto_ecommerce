const {UserRoles, Users, Roles} = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op

const addUserRoles = async(req, res)=>{

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
        } else {
            res.json({message:"Credenciales no encontradas"})
        }
    }    
}

const userRoles = async(req,res)=>{
    const {email, role} = req.body
    const user_ = await Users.findOne({where:{email: email}})
    const role_ = await Roles.findOne({where: {name: role}})

    const userRole = await UserRoles.findOne({where: {
        [Op.and]: [{user_id: user_.id}, {role_id: role_.id}]
    }}) //Role de usuario que coincide con el request

    if (userRole) {
        await userRole.destroy()
        res.json({
            message: "Role de Usuario Borrado"
        })
    } else {
        res.json({
            message: "No Existe Role de Usuario"
        })
    }


}

module.exports = {
    addUserRoles,
    userRoles
}