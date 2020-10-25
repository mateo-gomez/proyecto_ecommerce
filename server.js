const express = require('express')
const {validationToken} = require('./middlewares/auth')
const app = express()
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const cors = require('cors')


//Import Routes
const authRouter = require('./routes/auth');
const userRouter = require('./routes/users');
const userRolesRouter = require('./routes/user_roles')


//Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())

app.use(authRouter)
app.use(validationToken)
app.use(userRouter)
app.use(userRolesRouter)

app.get('/', (_, response)=>{
    response.send("Hola mundo")
})

module.exports = app