const nodemailer = require('nodemailer')
const fs = require('fs')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.G_ACC,
        pass: process.env.G_PASS
    }
})

const mailOptions = {
    from: process.env.G_ACC,
    to: 'motokoviloria@gmail.com',
    subject: 'MENSAJE DE NODE',
    text: 'Cuerpo del mensaje',
    //html: fs.createReadStream('plantilla.html')
}

const sendMail = (to, text) => {
    return new Promise((resolve, reject)=>{
        mailOptions.text = text
        mailOptions.to = to
        transporter.sendMail(mailOptions, (err, info)=>{
            if (err) {
                reject(err.message)
            } else {
                resolve(info.response)
            }
        })
    })
}

module.exports = sendMail