const {Coupons} = require('../models')
const {generateToken} = require('../controllers/auth')

const getCoupones = async(req, res)=>{

    try {

        const getPagination = (page, size) => {
            const limit = size ? +size : 3;
            const offset = page ? page * limit : 0;
          
            return { limit, offset };
          };

        const getPagingData = (data, page, limit) => {
            const { count: totalItems, rows: coupons } = data;
            const currentPage = page ? +page : 0;
            const totalPages = Math.ceil(totalItems / limit);
        return { totalItems, coupons, totalPages, currentPage };
        };

        const { page, size, total } = req.query;
        var condition = total ? { total } : null;

        const { limit, offset } = getPagination(page, size);

        await Coupons.findAndCountAll({ where: condition, limit, offset })
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

const postCoupones = async(req, res)=>{

    try {

        const {
            description,
            active,
            value,
            multiple,
            start_date,
            end_date
        } = req.body

        await Coupons.create({
            code: generateToken(4),
            description,
            active,
            value,
            multiple,
            start_date,
            end_date,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        res.json({
            message: 'Cupon creado'
        })


        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const putCoupones = async(req, res)=>{

    try {

        const id = req.params.id
        const coupon = await Coupons.findOne({where: {id}})
        
        if (coupon) {

            const {
                code,
                description,
                active,
                value,
                multiple,
                start_date,
                end_date
            } = req.body
            await Coupons.update({
                code,
                description,
                active,
                value,
                multiple,
                start_date,
                end_date
            }, {where: {id}})
            res.json({
                message: 'Cupon fue actualizado'
            })
            
        } else {
            
        }
        
    } catch (error) {

        res.json({
            message: 'Error en la petición',
            error: error.message
        })
        
    }

}

const deleteCoupones = async(req, res)=>{

    try {

        const id = req.params.id
        const coupon = await Coupons.findOne({where: {id}})

        if (coupon) {

            await coupon.destroy()
            res.json({
                message: 'Cupon elimindado'
            })
            
        } else {

            res.json({
                message: 'Cupon no encontrado'
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
    getCoupones,
    postCoupones,
    putCoupones,
    deleteCoupones
}