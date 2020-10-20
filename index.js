const express = require('express')
const { Users, Roles} = require('./models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendMail = require('./middlewares/nodemailer')
const validationToken = require('./middlewares/auth')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')


//Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())

app.get('/', (_, response)=>{
    response.send("Hola mundo")
})

app.use(validationToken)


app.listen(3000, ()=>{
    console.log('Puerto 3000')
})
