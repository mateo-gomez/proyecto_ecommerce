const usersController = require("../controllers/users").Users;

module.exports = (app) => {
    app.get('/api', (req,res)=> res.status(200).send({
        message: "Peticion Get"
    }))
    app.post('/api/users/create/username/:email/status/:status', usersController.create)
    app.get('api/users/list', usersController.list)
    app.get('api/users/find/username/:email', usersController.find)
}