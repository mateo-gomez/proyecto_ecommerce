const {ProductCategories, Categories, Products} = require('../models')
const sequelize = require('sequelize')
const Op = sequelize.Op

const getPC = async(req, res) => {

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

        await ProductCategories.findAndCountAll({ where: condition, limit, offset })
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

const addPC = async(req, res) => {

    try {

        const {name_category, name_product} = req.body
        const cat = await Categories.findOne({where: {name: name_category}})
        const prd = await Products.findOne({where: {name: name_product}})

        if (!cat||!prd) {

            res.json({
                message: 'Credenciales no encontradas'
            })
            
        } else {

            const pcExist = await ProductCategories.findOne({where: {
                [Op.and] : [{category_id: cat.id}, {product_id: prd.id}]
            }})
    
            if (pcExist) {

                res.json({
                    message: 'Ya existe relacion producto-categoria'
                })
                
            } else {

                await ProductCategories.create({
                    category_id: cat.id,
                    product_id: prd.id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                res.json({
                    message: 'Relacion creada'
                })
                
            }
            
        } 
        
    } catch (error) {

        res.json({
            message: "Error en petición",
            error: error.message
        })
        
    }

}

const updatePC = async(req, res) => {

    try {

        const id = Number(req.params.id)
        const {name_category, name_product} = req.body
        const pc = await ProductCategories.findOne({where: {id}})
        if (pc) {

            const cat = await Categories.findOne({where: {name:name_category}})
            const prd = await Products.findOne({where: {name:name_product}})

            if (!cat||!prd) {

                res.json({
                    message: 'Credenciales no encontradas'
                })
                
            } else {

                await ProductCategories.update({
                    category_id: cat.id,
                    product_id: prd.id
                }, {where: {id: id}})//3004325644
                res.json({
                    message: 'Registro Actualizado'
                })
                
            }
            
        } else {

            res.json({
                message: 'Registro no encontrado'
            })
            
        }
        
        
    } catch (error) {

        res.json({
            message: 'Error en petición',
            error: error.message
        })
        
    }

}

const deletePC = async(req, res) => {

    try {

        const id = Number(req.params.id)
        const pc = await ProductCategories.findOne({where: {id}})
        if (pc) {

            await pc.destroy()
            res.json({
                message: 'Registro Eliminado'
            })
            
        } else {

            res.json({
                message: 'Registro no encontrado'
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
    getPC,
    addPC,
    updatePC,
    deletePC
}