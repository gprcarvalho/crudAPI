const UserModel = require('../Model/user')


// Criando e salvando um usuário novo
exports.create = async (req,res) => {
    if (!req.body.email && !req.body.firstName && !req.body.lastName && !req.body.phone) {
        res.status(400).send({ message: "Content can not be empty!" });
    }
    const user = new UserModel({
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        phone: req.body.phone
    });

    await user.save().then(data => {
        res.send ({
            message:"User created sucessfully!!",
            user:data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occured while creating user"
        });
    });
};

// Trazendo todos os users

exports.findAll = async (req, res) => {
    try {
        const user = await UserModel.find();
        res.status(200).json(user);
    }   catch(error) {
        res.status(400).json({message: error.message});
    }
};

// Buscando user por id

exports.findOne = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.status(200).json(user);
    } catch(error) {
        res.status(400).json({message: error.message});
    }
};

// Atualizando user 

exports.update = async (req, res) => {
    if(!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
    }

    const id = req.params.id;

    await UserModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false}).then(data => {
        if(!data) {
            res.status(400).send({
                message: "User not found."
            });
        } else {
            res.send({ message: "User updated sucessfully!!"})
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

// Deletando user

exports.destroy = async (req, res) => {
    await UserModel.findByIdAndRemove(req.params.id).then(data => {
        if (!data) {
            res.status(404).send({
                message: "User not found"
            });
        } else {
            res.send({
                message: "User deleted sucessfully"
            });
        }
    }).catch(err => {
        res.status(500).send({
            message: err.message
        });
    });
};

