const {Roles} = require('../models')

const getRoles = async(_,res)=>{

    try {

        const roles = await Roles.findAll()
        res.json(roles)
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const postRoles = async(req,res)=>{

    try {

        const {name} = req.body
        const role = await Roles.create({
            name,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.json({
            message: 'Role agregado'
        })
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const putRoles = async(req, res)=>{

    try {

        const {name} = req.body
        const id = Number(req.params.id)
        await Roles.update({name}, {where: {id}})
        res.json({
            message: 'Role actualizado'
        })
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const deleteRoles = async(req,res)=>{

    try {

        const id = Number(req.params.id)
        const role = await Roles.findOne({where: {id}})
        if (role) {

            await role.destroy()
            res.json({
                message: 'Role eliminado'
            })
            
        } else {

            res.json({
                message: 'Role no encontrado'
            })
            
        }
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

module.exports = {
    getRoles,
    postRoles,
    putRoles,
    deleteRoles
}