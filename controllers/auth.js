const sequelize = require('sequelize');
const Op = sequelize.Op;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const sendMail = require('../middlewares/nodemailer');
const {Users, Roles} = require('../models');
const roles = require('../utils/roles');


const login = async (req, res)=>{

    const {email, password} = req.body
    let user = await Users.findOne({
        include: [{
            model: Roles,
            as: 'roles'
        }],
        where: {email: email}});
    

    if(user){
        bcrypt.compare(password, user.password, function(error, response) {
            if (response) { 
                const token = jwt.sign({
                    id: user.id,
                    email: user.email,
                    firstName: user.first_name,
                    lastName: user.last_name,
                    roles: user.roles
                }, process.env.SECRET_WORD, {expiresIn: '20m'})
                
                res
                .cookie('token_access', token, {
                    expires: new Date( Date.now() + 20 * 60000)
                })
                .status(200)
                .json({message:"Iniciaste sesion correctamente"})
            }
            else{ res.status(401).json({message:"Credenciales incorrectas"}) }
        })
    } else {
        res.status(401).json({message:"Usuario no existe"})
    }
}

const logout = (_, res) => {
    
    res.clearCookie('token_access').json({
        message: 'Cerraste sesion'
    })
    
}

const resetPassword = async (req, res)=>{
    try {
        let email = req.body.email
        const user = await Users.findOne({
            where: {
                email: email
            }
        })
        if (user) {
            await sendMail(email, user.id, user.token)
            res.json({
            message: "Correo enviado",
            to:req.body.email,
        })
        } else {
            res.status(400).json({
                message: "Usuario no existe"
            })
        }

    } catch (error) {
        res.status(400).json({
            message: "Correo no fue enviado",
            error: error
        })
    }
}

const generateToken = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

const updatePassword = async (req, res) => {

    const {id, token, password} = req.body;
    const user = await Users.findOne({
        where: {
            [Op.and]: [
                {
                    id: id
                }, {
                    token: token
                }
            ]
        }
    });

    if (user) {
        const passwordEncrypted = bcrypt.hashSync(password, 10);
        
        const updatedUser = await Users.update({
            password: passwordEncrypted,
            token: generateToken(5),
            updated_at: new Date()
        }, {
            returning: true,
            where: {
                id: id
            }
        });
        res.json({message: "Se ha actualizado la contraseña"})
        

    } else {
        res
            .status(400)
            .json({message: "No se actualizó la contraseña"})
    }

}

module.exports = {

    login,
    logout,
    resetPassword,
    updatePassword,
    generateToken
    
}