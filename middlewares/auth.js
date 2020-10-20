const jwt = require('jsonwebtoken')

const validationToken = (request, response, next)=>{

    const token =  request.cookies.token_access
    if (token) {

        try {
            request['token']= token
            let decoded = jwt.verify(token, process.env.SECRET_WORD)
            request['decoded'] = decoded
    
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
            message: 'No has iniciado sesión'
        })
    }
    
}

module.exports = validationToken