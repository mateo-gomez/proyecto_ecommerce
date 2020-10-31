const {SalesOrders} = require('../models')

const getSO = async(req, res)=>{

    try {

        const getPagination = (page, size) => {
            const limit = size ? +size : 3;
            const offset = page ? page * limit : 0;
          
            return { limit, offset };
          };

        const getPagingData = (data, page, limit) => {
            const { count: totalItems, rows: tutorials } = data;
            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, tutorials, totalPages, currentPage };
        };

        const { page, size, total } = req.query;
        var condition = total ? { total } : null;

        const { limit, offset } = getPagination(page, size);

        await SalesOrders.findAndCountAll({ where: condition, limit, offset })
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