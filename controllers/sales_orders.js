const {SalesOrders} = require('../models')

const getSO = async(req, res)=>{

    try {

        const so = await SalesOrders.findAll()
        res.json(so)
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const postSO = async(req, res)=>{

    try {

        const {
            order_date,
            total,
            coupon_id,
            session_id,
            user_id
        } = req.body
        const so = await SalesOrders.create({
            order_date,
            total,
            coupon_id,
            session_id,
            user_id
        })
        res.json({
            message: 'Orden de venta creada'
        })


        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const putSO = async(req, res)=>{

    try {

        const id = req.params.id
        const so = await SalesOrders.findOne({where: {id}})
        if (so) {

            const {
                order_date,
                total,
                coupon_id,
                session_id,
                user_id
            } = req.body

            await SalesOrders.update({
                order_date,
                total,
                coupon_id,
                session_id,
                user_id,
                updatedAt: new Date()
            }, {where: {id}})
            res.json({
                message: 'Orden Actualizada'
            })
            
        } else {

            res.json({
                message: 'Orden no encontrada'
            })
            
        }
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const deleteSO = async(req, res)=>{

    try {

        const id = req.params.id
        const so = await SalesOrders.findOne({where: {id}})
        if (so) {

            await so.destroy()
            res.json({
                message: 'Orden eliminada'
            })
            
        } else {

            res.json({
                message: 'Orden no encontrada'
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
    getSO,
    postSO,
    putSO,
    deleteSO
}