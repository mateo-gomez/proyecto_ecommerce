const {Tags} = require('../models')

const getTags = async(req, res)=>{

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

        await Tags.findAndCountAll({ where: condition, limit, offset})
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

const postTags = async(req, res)=>{

    try {

        const {name} = req.body
        await Tags.create({name})
        res.json({
            message: 'Tag guardado'
        })
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const putTags = async(req, res)=>{

    try {

        const id = req.params.id
        const tag = await Tags.findOne({where:{id}})
        const {name} = req.body
        if (tag) {

            await Tags.update({
                name
            }, {where: {id}})
            res.json({
                message: 'Tag Actualizado'
            })
            
        } else {

            res.json({
                message: 'Tag no encontrado'
            })
            
        }

        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const deleteTags = async(req, res)=>{

    try {

        const id = req.params.id
        const tag = await Tags.findOne({where: {id}})
        if (tag) {

            await tag.destroy()
            res.json({
                message: 'Tag fue eliminado'
            })
            
        } else {

            res.json({
                message: 'Tag no fue encontrado'
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
    getTags,
    postTags,
    putTags,
    deleteTags
}