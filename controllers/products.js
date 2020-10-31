const {Products, ProductStatuses, ProductCategories} = require('../models')


const getProducts = async(req, res)=>{
    
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

        await Products.findAndCountAll({ where: condition, limit, offset,
            include:[{
                        model: ProductStatuses,
                        as: 'status',
                        attributes: ['id', 'name']
                    }]
        })
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

const addProducts = async(req, res)=>{

    try {

        const {
            sku,
            name,
            description,
            regular_price,
            discount_price,
            quantity,
            taxable,
        } = req.body
        const productExist = await Products.findOne({where: {name}})

        if (productExist) {

            res.status(400).json({
                message: 'Ya existe un producto con ese nombre'
            })
            
        } else {

            const ps = await ProductStatuses.findOne({where: {name: 'inStock'}})
            await Products.create({
                sku,
                name,
                description,
                product_status_id: ps.id,
                regular_price,
                discount_price,
                quantity,
                taxable,
                createdAt: new Date(),
                updatedAt: new Date()
            })
            res.json({
                message: 'Producto agregado'
            })
            
        }

    } catch (error) {
        res.json({
            message: 'Error en la petición',
            error: error.message
        })
    }
}

const updateProducts = async(req, res)=>{

    try {

        const {
            sku,
            name, 
            description, 
            regular_price,
            quantity,
            taxable
        } = req.body
        const product = await Products.findOne({where: {sku}})
        const nameExist = await Products.findOne({where: {name}})

        if (product) {

            await Products.update({

                sku, 
                name, 
                description, 
                regular_price, 
                quantity,
                taxable
    
            }, {where: {id: product.id}})
            res.json({
                message: 'Producto Actualizado'
            })

        } else {

            res.json({
                message: 'Producto no encontrado'
            })
            
        }

        
    } catch (error) {
        res.json({
            message: 'Error en la petición',
            error: error.message
        })
    }
}

const deleteProducts = async(req, res)=>{

    try {

        const {sku} = req.body
        const product = await Products.findOne({where: {sku}})
        if (product) {

            product.destroy()
            res.json({
                message: 'Producto Eliminado'
            })
            
        } else {

            res.json({
                message: 'Producto no encontrado'
            })
            
        }
        
    } catch (error) {
        res.json({
            message: 'Error en petición',
            error: error.message
        })
    }

}

module.exports = {
    getProducts,
    addProducts,
    updateProducts,
    deleteProducts
}