const {Products, ProductStatuses, ProductCategories} = require('../models')


const getProducts = async(_, res)=>{
    
    try {

        const products = await Products.findAll({
            include: [
            {
                model: ProductStatuses,
                as: 'product_statuses',
                attributes: ['id', 'name']
            }]
        })
        res.json(products)
        
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