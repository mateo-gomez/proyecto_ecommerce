const {Tags} = require('../models')

const getTags = async(_, res)=>{

    try {

        const tags = await Tags.findAll()
        res.json(tags)
        
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