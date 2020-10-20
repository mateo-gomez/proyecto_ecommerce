
const register = async (req, res) => {
    
    let {email,first_name,last_name,active,password,token,} = req.body
    const encryptedPassword = bcrypt.hashSync(password,10)
    const user = await Users.create({
        email,
        first_name,
        last_name,
        active,
        password: encryptedPassword,
        token,
        createdAt: new Date(),
        updatedAt: new Date()
    })
     res.json({message: "Usuario fue agregado correctamente"})
};

const findAll = async (request,response) => {

    const users = await Users.findAll({
        include: [{
            model: Roles,
            as: 'roles',
            required: false,
            attributes: ['id', 'name'],
            through: { attributes: []}
        }]
    });
    response.json({ results: users })

}

const findOne = async (request,response) => {
    
    const userId = request.params.id
    const users = await Users.findOne({ 
        where: {id:userId},
        include: [{
            model: Roles,
            as: 'roles',
            required: false,
            attributes: ['id', 'name'],
            through: { attributes: []}
        }]
    });
    response.json(users)

}

const deactivate = async (request, response) => {

    let userId = Number(request.params.id);
    let decoded = jwt.verify(request.token, process.env.SECRET_WORD)
    try {

        if (decoded.id !== userId) {
            
            let user = await Users.update({active:false},{where: {id: userId}});
            response.json({
                message: "La cuenta ha sido desactivada",
                currentAccountId: decoded.id,
                accountDeletedId: userId
            });
        } else {
            response.json({message:"No es posible desactivar la cuenta actual"})
        }

    } catch (error) {
        response.status(400).json({
            error
        })
    }
}

const update = async (request, response) => {
    let userId = request.params.id;
    let {first_name, last_name, email, active, token, password} = request.body;
    try{
        const users = await Users.update({
            first_name,
            last_name,
            email,
            active,
            token,
            password,
            updated_at: new Date()
        }, { returning: true, where: {id: userId} });
        const user = users[1][0].dataValues;
        response.json(user);
    }catch(error){
        response.status(400).json({
            message: "No se ha podido actualizar el registro"
        });
    }
}

module.exports = {
    register,
    findAll,
    findOne,
    deactivate,
    update
}