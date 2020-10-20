

const login = async (req, res)=>{


    const {email, password} = req.body
    let user = await Users.findOne({where: {email: email}});
    try {

        if(user){
            bcrypt.compare(password, user.password, function(error, response) {
                if (response) { 
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        firstName: user.first_name,
                        lastName: user.last_name
                    }, process.env.SECRET_WORD, {expiresIn: '3m'})
                    
                    res
                    .cookie('token_access', token, {
                        expires: new Date( Date.now() + 8 * 3600000)
                    })
                    .status(200)
                    .json({message:"Iniciaste sesion correctamente"})
                }
                else{ res.status(401).json({message:"Credenciales incorrectas"}) }
            })
        } else {
            res.status(401).json({message:"Usuario no existe"})
        }
        
    } catch (error) {
        res.json({message:"Error en la petición"})
    }
    
}

const logout = (req, res) => {
    res.clearCookie('token_access').json({
        message: 'Cerraste sesion'
    })
}

const resetPassword = async (req, res)=>{
    try {
        
        await sendMail(req.body.email, req.token)
        res.json({
            message: "Correo enviado",
            to:req.body.email,
        })

    } catch (error) {
        res.status(400).json({
            message: "Correo no fue enviado",
            error: error
        })
    }
}

const updatePassword = () => {
    
}

module.exports = {
    login,
    logout,
    resetPassword,
    updatePassword
}