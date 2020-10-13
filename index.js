const { request, response } = require('express')
const express = require('express')
const { Users } = require('./models')

const app = express()


//Middleware
app.get('/', (request, response)=>{
    response.send("Hola mundo")
})

app.get('/api/v1/users', async (request,response)=>{
    const users = await Users.findAll();
    response.json(
        {
            results: users
        }
    )
})

app.get('/api/v1/users/:id', async (request,response)=>{
    const userId = request.params.id
    const users = await Users.findOne({
        where: {id:userId}
    });
    response.json(users)
})

app.listen(3000, ()=>{
    console.log('Puerto 3000')
})