const {CCTransactions} = require('../models')
const {generateToken} = require('./auth')

const getCCT = async(req, res)=>{

    try {

        const getPagination = (page, size) => {
            const limit = size ? +size : 3;
            const offset = page ? page * limit : 0;
          
            return { limit, offset };
        };

        const getPagingData = (data, page, limit) => {
            const { count: totalItems, rows: transactions } = data;
            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);
            return { totalItems, transactions, totalPages, currentPage };
        };

        const { page, size, total } = req.query;
        var condition = total ? { total } : null;

        const { limit, offset } = getPagination(page, size);

        await CCTransactions.findAndCountAll({ where: condition, limit, offset })
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

const postCCT = async(req, res)=>{

    try {

        const {
            order_id,
            transdate,
            processor,
            processor_trans_id,
            amount,
            cc_num,
            cc_type,
            responde
        } = req.body
        await CCTransactions.create({
            code: generateToken(8),
            order_id,
            transdate,
            processor,
            processor_trans_id,
            amount,
            cc_num,
            cc_type,
            responde
        })
        res.json({
            message: 'Transacción registrada'
        })
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const putCCT = async(req, res)=>{

    try {

        const id = req.params.id
        const cct = await CCTransactions.findOne({where: {id}})

        if (cct) {

            const {
                order_id,
                transdate,
                processor,
                processor_trans_id,
                amount,
                cc_num,
                cc_type,
                responde
            } = req.body
            await CCTransactions.update({
                order_id,
                transdate,
                processor,
                processor_trans_id,
                amount,
                cc_num,
                cc_type,
                responde
            }, {where: {id}})
            res.json({
                message: 'Transacción actualizada'
            })
            
        } else {

            res.json({
                message: 'Transacción no encontrada'
            })
            
        }
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const deleteCCT = async(req, res)=>{

    try {

        const id = req.params.id
        const cct = await CCTransactions.findOne({where:{id}})
        if (cct) {

            await cct.destroy()
            res.json({
                message: 'Transacción eliminada'
            })
            
        } else {

            res.json({
                message: 'Transacción no encontrada'
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
    getCCT,
    postCCT,
    putCCT,
    deleteCCT
}