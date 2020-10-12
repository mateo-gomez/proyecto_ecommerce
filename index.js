const { request, response } = require('express')
const express = require('express')
const {Users} = require('./models')

const app = express()


//Middleware
app.get('/', (request, response)=>{
    response.send("Hola mundo")
})

app.get('/users', async (request,response)=>{
    const users = await Users.findAll();
    response.json(
        {
            results: users
        }
    )
})

app.listen(3000, ()=>{
    console.log('Puerto 3000')
})