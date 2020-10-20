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

//LOGIN
app.post('api/v1/users/login', async (request, response)=>{
    const {email, password} = request.body
    let user = await Users.findOne({where: {email: email}});
    try {

        if(user){
            bcrypt.compare(password, user.password, function(err, res) {
                if (res) { 
                    const token = jwt.sign({
                        id: user.id,
                        email: user.email,
                        firstName: user.first_name,
                        lastName: user.last_name
                    }, process.env.SECRET_WORD, {expiresIn: '3m'})
                    
                    response
                    .cookie('token_access', token, {
                        expires: new Date( Date.now() + 8 * 3600000)
                    })
                    .status(200)
                    .json({message:"Iniciaste sesion correctamente"})
                }
                else{ response.status(401).json({message:"Credenciales incorrectas"}) }
            })
        } else {
            response.status(401).json({message:"Usuario no existe"})
        }
        
    } catch (error) {
        response.json({message:"Error en la petición"})
    }
    
})


//REGISTER
app.post('/api/v1/users/', async (request,response)=>{
    
    let {email,first_name,last_name,active,password,token,} = request.body
    const encryptedPassword = bcrypt.hashSync(password,10)
    const user = await Users.create({
        email,
        first_name,
        last_name,
        active,
        password: encryptedPassword,
        token,
        createdAt: new Date(),
        updatedAt: new Date()
    })
    response.json({message: "Usuario fue agregado correctamente"})
});


//TOKEN VALIDATION
app.use(validationToken)


//SEND MAIL
app.post('api/v1/users/reset-password', async (req, res)=>{
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
})


//GET ALL 
app.get('/api/v1/users', async (request,response)=>{

    const users = await Users.findAll({
        include: [{
            model: Roles,
            as: 'roles',
            required: false,
            attributes: ['id', 'name'],
            through: { attributes: []}
        }]
    });
    response.json({ results: users })
})


//FIND BY ID
app.get('/api/v1/users/:id', async (request,response)=>{
    
    const userId = request.params.id
    const users = await Users.findOne({ 
        where: {id:userId},
        include: [{
            model: Roles,
            as: 'roles',
            required: false,
            attributes: ['id', 'name'],
            through: { attributes: []}
        }]
    });
    response.json(users)
})


//UPDATE
app.put('/api/v1/users/:id', async(request, response) => {
    let userId = request.params.id;
    let {first_name, last_name, email, active, token, password} = request.body;
    try{
        const users = await Users.update({
            first_name,
            last_name,
            email,
            active,
            token,
            password,
            updated_at: new Date()
        }, { returning: true, where: {id: userId} });
        const user = users[1][0].dataValues;
        response.json(user);
    }catch(error){
        response.status(400).json({
            message: "No se ha podido actualizar el registro"
        });
    }
});


//DELETE
app.delete('/api/v1/users/:id', async (request, response) => {

    let userId = Number(request.params.id);
    let decoded = jwt.verify(request.token, process.env.SECRET_WORD)
    try {

        if (decoded.id !== userId) {
            
            let user = await Users.update({active:false},{where: {id: userId}});
            response.json({
                message: "La cuenta ha sido desactivada",
                currentAccountId: decoded.id,
                accountDeletedId: userId
            });
        } else {
            response.json({message:"No es posible desactivar la cuenta actual"})
        }

    } catch (error) {
        response.status(400).json({
            error
        })
    }
});


//LOGOUT
app.post('/logout', (_,res)=>{
    res.clearCookie('token_access').json({
        message: 'Cerraste sesion'
    })
})



app.listen(3000, ()=>{
    console.log('Puerto 3000')
})
