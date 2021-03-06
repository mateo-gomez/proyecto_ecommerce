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
const catRouter = require('./routes/categories')
const psRouter = require('./routes/product_statuses')
const productsRouter = require('./routes/products')
const pcRouter = require('./routes/product_categories')
const rolesRouter = require('./routes/roles')
const tagsRouter = require('./routes/tags')
const sessionsRouter = require('./routes/sessions')
const ptRouter = require('./routes/product_tags')
const couponsRouter = require('./routes/coupons')
const soRouter = require('./routes/sales_orders')
const cctRouter = require('./routes/cc_transactions')
const opRouter = require('./routes/order_products')


//Middleware
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(cookieParser())

app.get('/', (_, response)=>{
    response.send("Hola mundo")
})

//ROUTES
app.use(authRouter)
app.use(userRouter)
app.use(validationToken)
app.use(userRolesRouter)
app.use(catRouter)
app.use(psRouter)
app.use(productsRouter)
app.use(pcRouter)
app.use(rolesRouter)
app.use(tagsRouter)
app.use(sessionsRouter)
app.use(ptRouter)
app.use(couponsRouter)
app.use(soRouter)
app.use(cctRouter)
app.use(opRouter)

module.exports = app