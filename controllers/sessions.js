const {Sessions} = require('../models')

const getSessions = async(_, res)=>{

    try {

        const sessions = await Sessions.findAll()
        res.json(sessions)
        
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