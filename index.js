const { request, response } = require('express');
const express = require('express');

const app = express();
const {users} = require('./models')

//Middleware
app.get('/', (request, response)=>{
    response.send("Hola mundo")
})

app.get('/users', (request,response)=>{
    response.json(
        {
            results:[]
        }
    )
})

app.listen(3000, ()=>{
    console.log('Puerto 3000')
})