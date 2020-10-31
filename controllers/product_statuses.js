const {ProductStatuses} = require('../models')


const getPS = async(req,res)=>{

    try {

        const getPagination = (page, size) => {
            const limit = size ? +size : 3;
            const offset = page ? page * limit : 0;
          
            return { limit, offset };
          };

        const getPagingData = (data, page, limit) => {
            const { count: totalItems, rows: statuses } = data;
            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, statuses, totalPages, currentPage };
        };

        const { page, size, total } = req.query;
        var condition = total ? { total } : null;

        const { limit, offset } = getPagination(page, size);

        await ProductStatuses.findAndCountAll({ where: condition, limit, offset })
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
            message: 'Error en la petición'
        })
    }
}

const addPS = async(req,res)=>{

    try {

        const {name} = req.body
        const ps = await ProductStatuses.findOne({
            where: {name}
        })
        if (ps) {
            res.json({
                message: 'Estado ya existe'
            })
        } else {

            await ProductStatuses.create({
                name,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            res.json({
                message: 'Estado registrado'
            })
            
        }
        
    } catch (error) {
        res.json({
            message: 'Error en la petición'
        })
    }
    
}

const updatePS = async(req, res)=>{
    try {

        const {name, new_name} = req.body
        const ps = await ProductStatuses.findOne({
            where: {name}
        })
        const psExist = await ProductStatuses.findOne({
            where: {name: new_name}
        })
        if (ps) {

            if (psExist) {

                res.json({
                    message: 'Estado ya existe'
                })
                
            } else {

                await ProductStatuses.update({
                    name: new_name,
                    updatedAt: new Date()
                }, {where: {name:name}})
                res.json({
                    message: 'Estado Actualizado'
                })
                
            }
            
        } else {
            res.json({
                message: 'Estado no encontrado'
            })
        }

        
    } catch (error) {
        res.json({
            message: 'Error en la petición'
        })
    }
}

const deletePS = async(req, res)=>{

    try {

        const {name} = req.body
        const ps = await ProductStatuses.findOne({
            where: {name}
        })
        if (ps) {

            await ps.destroy()
            res.json({
                message: 'Estado Eliminado'
            })

        } else {

            res.json({
                message: 'Estado no existe'
            })
            
        }
        
    } catch (error) {
        res.json({
            message: 'Error en la petición'
        })
    }
}

module.exports = {
    addPS,
    updatePS,
    deletePS,
    getPS
}