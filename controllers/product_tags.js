const sequelize = require('sequelize')
const Op = sequelize.Op
const {ProductTags, Tags, Products} = require('../models')

const getPT = async(req, res)=>{

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

        await ProductTags.findAndCountAll({ where: condition, limit, offset })
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
            message: 'Error en petición',
            error: error.message
        })
        
    }

}

const postPT = async(req, res)=>{

    try {

        const {name_tag, name_pro} = req.body
        const tag = await Tags.findOne({where: {name: name_tag}})
        const product = await Products.findOne({where: {name: name_pro}})

        if (!tag||!product) {

            const pt = await ProductTags.findOne({where: {
                [Op.and]: [{tag_id: tag.id}, {product_id: product.id}]
            }})

            if (pt) {

                res.json({
                    message: 'Relación ya existe'
                })
                
            } else {

                await ProductTags.create({
                    product_id: product.id,
                    tag_id: tag.id,
                    createdAt: new Date(),
                    updatedAt: new Date()
                })
                res.json({
                    message: 'Relación creada'
                })
                
            }
            
        } else {

            res.json({
                message: 'Credenciales no encontradas'
            })
            
        }
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const putPT = async(req, res)=>{

    try {

        const id = req.params.id
        const pt = await ProductTags.findOne({where: {id}})

        if (pt) {

            const {name_tag, name_pro} = req.body

            const tag = await Tags.findOne({where: {name:name_tag}})
            const pro = await Products.findOne({where: {name: name_pro}})

            if (tag&&pro) {

                await ProductTags.update({
                    product_id: pro.id,
                    tag_id: tag.id,
                    updatedAt: new Date()
                }, {where: {id: pt.id}})
                res.json({
                    message: 'Relación actualizada'
                })
                
            } else {

                res.json({
                    message: 'Credenciales no encontradas'
                })
                
            }
            
        } else {

            res.json({
                message: 'No se encontró relación'
            })
            
        }
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const deletePT = async(req, res)=>{

    try {

        const id = req.params.id
        const pt = await ProductTags.findOne({where: {id}})
        
        if (pt) {

            await pt.destroy()
            res.json({
                message: 'Relación eliminada'
            })
            
        } else {

            res.json({
                message: 'Relación no encontrada'
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
    getPT,
    postPT,
    putPT,
    deletePT
}