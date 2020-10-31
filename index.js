
const server = require('./server')

let port = process.env.PORT || 3000
server.listen(port, ()=>{
    console.log('Puerto '+port)
})
