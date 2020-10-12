const { request, response } = require('express')
const express = require('express')
const {Users} = require('./models')

const app = express()


//Middleware
app.get('/', (request, response)=>{
    response.send("Hola mundo")
})

app.get('/users', (request,response)=>{
    const users = Users.findAll();
    response.json(
        {
            results:[]
        }
    )
})

app.listen(3000, ()=>{
    console.log('Puerto 3000')
})