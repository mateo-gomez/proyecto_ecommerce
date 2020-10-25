const nodemailer = require('nodemailer')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.G_ACC,
        pass: process.env.G_PASS
    }
})

const mailOptions = (email, userId, token)=> {
    return {
            from: process.env.G_ACC,
            to: email,
            subject: 'MENSAJE DE NODE',
            text: 'Mensaje',
            html: `<h1>Restablecer contraseña</h1> 
            <a href="http://localhost:3000/actualizar-contrasena?user=${userId}&token=${token}">Da click aquí</a>`
    }
}

const sendMail = (email, userId, token) => {
    return new Promise((resolve, reject)=>{
    
        transporter.sendMail(mailOptions(email, userId, token), (err, info) => {
            if (err) {
                reject(err.message)
            } else {
                resolve(info.response)
            }
        })
    })
}

module.exports = sendMail