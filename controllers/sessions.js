const {Sessions} = require('../models')

const getSessions = async(req, res)=>{

    try {

        const getPagination = (page, size) => {
            const limit = size ? +size : 3;
            const offset = page ? page * limit : 0;
          
            return { limit, offset };
          };

        const getPagingData = (data, page, limit) => {
            const { count: totalItems, rows: sessions } = data;
            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, sessions, totalPages, currentPage };
        };

        const { page, size, total } = req.query;
        var condition = total ? { total } : null;

        const { limit, offset } = getPagination(page, size);

        await Sessions.findAndCountAll({ where: condition, limit, offset })
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

const postSessions = async(req, res)=>{

    try {

        const {data} = req.body
        await Sessions.create({
            data,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.json({
            message: 'Sesion creada'
        })
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const putSessions = async(req, res)=>{

    try {

        const id = req.params.id
        const {data} = req.body
        const sessionExist = await Sessions.findOne({where: {id}})
        if (sessionExist) {

            const session = await Sessions.update({
                data,
                updatedAt: new Date()
            }, {where: {id}})
            res.json({
                message: 'Sesión Actualizada',
                session
            })
            
        } else {

            res.json({
                message: 'Sesión no encontrada'
            })
            
        }
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const deleteSessions = async(req, res)=>{

    try {

        const id = req.params.id
        const session = await Sessions.findOne({where: {id}})
        if (session) {

            await session.destroy()
            res.json({
                message: 'Sesión eliminada'
            })
            
        } else {

            res.json({
                message: 'Sesión no encontrada'
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
    getSessions,
    postSessions,
    putSessions,
    deleteSessions
}