const repository = require('../repositories/login-repository');
const bcrypt = require('bcryptjs');

// login
exports.verifyUser = async (req, res) => {

    try {

        if (!req.body.email) {
            //console.log('E-mail não bate');
            return res.send({ auth: false });
        }

        const user = await repository.verifyUser(req.body);

        if (!user) {
            //console.log('Usuário não encontrado');
            return res.send({ auth: false });
        }

        if (!(bcrypt.compare(req.body.senha, user.senha))) {
            //console.log('Senhas não batem');
            return res.send({ auth: false });
        }

        //console.log('Usuário encontrado');
        return res.send({ auth: true });

    } catch(err) {
        res.send('Usuário não encontrado no banco de dados');
        console.log(err);
    }
}


// create
exports.create = async (req, res) => {
    try {
        let user = await repository.create({
            email: req.body.email,
            senha: req.body.senha
        });
        res.status(201).send(user);
    } catch(e) {
        res.status(400).send({ message: 'Falha ao cadastrar o usuário!' });
        console.log(e);
    }
};

exports.list = async (req, res) => {
    try {
        const data = await repository.list();
        res.status(200).send(data);
    } catch(e) {
        res.status(500).send({ mesage: 'Falha ao carregar os usuarios'});
        console.log(e);
    }
}