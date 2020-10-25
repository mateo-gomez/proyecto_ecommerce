const request = require('supertest')
const app = require('../server')
const db = require('../models')

describe('Rutas de Usuarios', ()=>{

    test('Registrar', async (done)=>{
        
        let res = await request(app)
        .post('/api/v1/users')
        .send({
            email : "prueba@gmail.com",
            first_name: "prueba",
            last_name: "prueba",
            password: "1234"
        })
        console.log(res.body)
        expect(res.statusCode).toBe(400)
        done()
        
    })

})

afterAll(()=>{
    db.sequelize.close()
})