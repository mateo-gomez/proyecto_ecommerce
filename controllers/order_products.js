
const {OrderProducts} = require('../models')



const getOP = async(req, res)=>{

    try {

        const getPagination = (page, size) => {
            const limit = size ? +size : 3;
            const offset = page ? page * limit : 0;
          
            return { limit, offset };
          };

        const getPagingData = (data, page, limit) => {
            const { count: totalItems, rows: items } = data;
            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, items, totalPages, currentPage };
        };

        const { page, size, total } = req.query;
        var condition = total ? { total } : null;

        const { limit, offset } = getPagination(page, size);

        await OrderProducts.findAndCountAll({ where: condition, limit, offset })
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
            error:error.message
        })
        
    }

}

const postOP = async(req, res)=>{

    try {

        const {
            order_id,
            sku,
            name,
            description,
            price,
            quantity,
            subtotal
        }= req.body
        await OrderProducts.create({
            order_id,
            sku,
            name,
            description,
            price,
            quantity,
            subtotal
        })
        res.json({
            message: 'Producto de orden registrado'
        })
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const putOP = async(req, res)=>{

    try {

        const id = req.params.id
        const op = await OrderProducts.findOne({where: {id}})
        if (op) {

            const {
                order_id,
                sku,
                name,
                description,
                price,
                quantity,
                subtotal
            } = req.body
            await OrderProducts.update({
                order_id,
                sku,
                name,
                description,
                price,
                quantity,
                subtotal
            }, {where: {id}})
            res.json({
                message: 'Producto de orden actualizado'
            })
            
        } else {

            res.json({
                message: 'Producto de orden no encontrado'
            })
            
        }
        
    } catch (error) {

        res.json({
            message: 'Error en la petición'
        })
        
    }

}

const deleteOP = async(req, res)=>{

    try {

        const id = req.params.id
        const op = await OrderProducts.findOne({where: {id}})
        if (op) {

            await op.destroy()
            res.json({
                message: 'Producto de orden elimindado'
            })
            
        } else {

            res.json({
                message: 'Producto de orden no encontrado'
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
    getOP,
    postOP,
    putOP,
    deleteOP
}