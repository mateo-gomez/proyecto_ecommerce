const request = require('supertest')
const app = require('../server')
const db = require('../models')
const {Users, Roles} = require('../models');
const {generateToken} = require('../controllers/auth')

describe('Rutas de Autenticación', ()=>{
    
    //LOGIN
    test('Inicio de sesion', async(done)=>{
        const res = await request(app)
        .post('/api/v1/users/login')
        .send({
            email: "luisvittory@gmail.com",
            password: "12345678"
        })
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('message')
        done()
    })
    test('Inicio de Sesion Fallido', async(done)=>{
        const res = await request(app)
        .post('/api/v1/users/login')
        .send({
            email: "luisvittory@gmail.com",
            password: "1234M"
        })
        expect(res.statusCode).toBe(401)
        expect(res.body).toHaveProperty('message')
        done()
    })
    test('Inicio de Sesion - Usuario no Existe', async(done)=>{
        const res = await request(app)
        .post('/api/v1/users/login')
        .send({
            email: "luismv@gmail.com",
            password: "1234"
        })
        expect(res.statusCode).toBe(401)
        expect(res.body).toHaveProperty('message')
        done()
    })
    
    //LOGOUT
    test('Cerrar Sesion', async(done)=>{
        let res = await request(app)
        .post('/api/v1/users/logout')

        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('message')
        done()
    })
    
    //RESET PASSWORD
    test('Restaurar Contraseña', async(done)=>{
        let res = await request(app)
        .post('/api/v1/users/reset-password')
        .send({email: "luisvittory@gmail.com"})
        
        expect(res.statusCode).toBe(200)
        expect(res.body).toHaveProperty('message')
        done()
    })
    test('Restaurar Contraseña - Usuario no existe', async(done)=>{

        let res = await request(app)
        .post('/api/v1/users/reset-password')
        .send({email: "noexist@na.com"})
        
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('message')
        done()
    })
    test('Restaurar Contraseña - Error en la petición', async(done)=>{
        let res = await request(app)
        .post('/api/v1/users/reset-password')
        .send(null)
        
        expect(res.statusCode).toBe(400)
        expect(res.body).toHaveProperty('message')
        done()
    })
    //GTKN
    test('Generador de Token', async(done)=>{
        let token = generateToken(10)
        expect(token.length).toBe(10)
        done()
    })
    //UPDATE PASSWORD
    test('Actualizar Contraseña', async(done)=> {
        let user = await Users.findOne({
            where: {
                email: "motokoviloria@gmail.com"
            }
        })
        
        let res = await request(app)
        .post('/api/v1/users/update-password')
        .send({
            id:user.id,
            token: user.token,
            password: "12345678"
        })
        
        expect(res.statusCode).toBe(200)
        done()
    })
    test('Actualizar Contraseña - Fallido', async(done)=> {
        
        let res = await request(app)
        .post('/api/v1/users/update-password')
        .send({
            id:60,
            token: 'fg56g',
            password: "1238"
        })
        
        expect(res.statusCode).toBe(400)
        done()
    })
    
    ///////
    ///////
    ///////

    

})


afterAll(()=>{
    db.sequelize.close()
})