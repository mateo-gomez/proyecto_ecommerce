
const server = require('./server')

let port = process.env.PORT || 8000
server.listen(port, ()=>{
    console.log('Puerto '+port)
})
