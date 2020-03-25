const repository = require('../repositories/login-repository');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

// login
exports.verifyUser = async (req, res) => {

    try {
        if (!req.body.email) {
            // E-mail não bate 
            return res.send({ auth: false });
        }

        const user = await repository.verifyUser(req.body);

        // Usuário não encontrado 
        if (!user) {
            return res.send({ auth: false });
        }

        // Senhas não coincidem
        const resComparacao = bcrypt.compareSync(req.body.senha, user.senha);
        if (!resComparacao) {
            return res.send({ auth: false });
        }

        // Usuário encontrado 
        const id = user._id;
        // Gera o token de acesso encriptado
        const token = jwt.sign({ id }, process.env.SECRET, {
            expiresIn: 36000 // 10 horas
        })
        return res.status(200).send({ auth: true, token: token });

    } catch(err) {
        res.send('Login inválido');
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