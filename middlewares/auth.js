const jwt = require('jsonwebtoken')

const roles = require('../utils/roles')

const validationToken = (request, response, next)=>{

    const token =  request.cookies.token_access
    if (token) {

        try {
            request['token']= token
            let decoded = jwt.verify(token, process.env.SECRET_WORD)
            request['user'] = decoded
    
            if (decoded) {
                next()
            }

        } catch (error) {
            response.status(401).json({
                message:"Token Invalido",
                error: error.message
            })
        }

    } else {
        response.status(400).json({
            message: 'Primero debes iniciar sesión'
        })
    }
    
}

const grantAcces = (action, resource) => {

    return async (request, response, next) => {

        let permission = null
        request.user.roles.forEach(role => {
            permission = roles().can(role.name)[action](resource)
            if(permission.granted){
                return permission
            }
        });
        
        if(!permission.granted){
            response.status(401).json({
                message: "Tu cuenta no tiene permisos"
            })
        }
        next()
    }
}



module.exports = {
    validationToken,
    grantAcces
}