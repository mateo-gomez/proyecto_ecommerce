
const server = require('./server')
require('dotenv').config()

let port = process.env.PORT || 8000
server.listen(port, ()=>{
    console.log('Puerto '+port)
})
