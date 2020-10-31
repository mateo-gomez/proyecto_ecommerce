const {Categories} = require('../models')

const addCategories = async(req, res)=>{
    
    try {

        const {name, parent_id} = req.body
        const categoryExist = await Categories.findOne({where: {name}})
        if (categoryExist) {
            res.json({
                message: 'Categoria ya existe'
            })
        } else {
            const data = await Categories.create({
                name: name,
                parent_id: parent_id,
                createdAt: new Date(),
                updatedAt: new Date()
            })

            res.json({
                message: 'Categoria creada'
            })
        }

    } catch (error) {
        res.json({
            message: 'Credenciales incorrectas'
        })
    }

}

const getCategories = async(req, res)=>{

    try {

        const getPagination = (page, size) => {
            const limit = size ? +size : 3;
            const offset = page ? page * limit : 0;
            return { limit, offset };
        };

        const getPagingData = (data, page, limit) => {
            const { count: totalItems, rows: categories } = data;
            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);
            return { totalItems, categories, totalPages, currentPage };
        };

        const { page, size, total } = req.query;
        var condition = total ? { total } : null;
        const { limit, offset } = getPagination(page, size);

        await Categories.findAndCountAll({ where: condition, limit, offset, 
            include:[{
                        model: Categories,
                        as: 'subcategories'
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
            message: 'Error en petición',
            error:error.message
        })
    }

}

const updateCategories = async(req, res)=>{

    try {

        const {name, new_name, parent_id} = req.body
        const category = await Categories.findOne({where: {name}})
        const categoryExist = await Categories.findOne({where: {name: new_name}})

        if (category) {

            if (categoryExist) {

                res.json({
                    message: 'Categoria ya existe'
                })
                
            } else {
                await Categories.update({
                    name: new_name,
                    parent_id,
                    updatedAt: new Date()
                }, {where: {name: name}})
                res.json({
                    message: 'Categoria Actualizada'
                })
            }

        } else {
            res.json({
                message: 'Categoria no encontrada'
            })
        }
        
    } catch (error) {
        res.json({
            message: 'Error en la petición'
        })
    }
    
}

const deleteCategories = async(req, res)=>{
    try {

        const {name} = req.body
        const category = await Categories.findOne({where: {name}})
        if (category) {
            
            await category.destroy()
            res.json({
                message: 'Categoria Eliminada'
            })

        } else {
            res.json({
                message: 'Categoria no existe'
            })
        }
        
    } catch (error) {
        res.json({
            message: 'error'
        })
    }
}


module.exports = {
    addCategories,
    getCategories,
    updateCategories,
    deleteCategories
}