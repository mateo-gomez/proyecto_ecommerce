const {Roles} = require('../models')

const getRoles = async(req,res)=>{

    try {

        const getPagination = (page, size) => {
            const limit = size ? +size : 3;
            const offset = page ? page * limit : 0;
          
            return { limit, offset };
          };

        const getPagingData = (data, page, limit) => {
            const { count: totalItems, rows: products } = data;
            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, products, totalPages, currentPage };
        };

        const { page, size, total } = req.query;
        var condition = total ? { total } : null;

        const { limit, offset } = getPagination(page, size);

        await Roles.findAndCountAll({ where: condition, limit, offset,})
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