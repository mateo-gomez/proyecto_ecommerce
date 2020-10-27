const {Categories} = require('../models')

const addCategories = async(req, res)=>{
    
    try {

        const {name, parent_id} = req.body
        const categoryExist = await Categories.findOne({
            where: {name: name}
        })
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

const getCategories = async(_, res)=>{

    try {

        const categories = await Categories.findAll()
        res.json(categories)
        
    } catch (error) {
        res.json({
            message: 'Credenciales incorrectas'
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