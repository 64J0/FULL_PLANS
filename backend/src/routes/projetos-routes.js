const express = require('express');
const router = express.Router();
const projetosController = require('../controllers/projetos-controller');
const jwt = require('jsonwebtoken');

const path = require('path');
const dotenv = require('dotenv');
dotenv.config({ path: path.resolve(__dirname, '../../.env') });

function verifyJWT(req, res, next) {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ auth: false, message: 'No token provided!' });

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({ error: 'Token error' });
    }

    const [ scheme, token ] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ error: 'Token malformatted' });
    }

    jwt.verify(token, process.env.SECRET, function(err, decoded) {
        if (err) {
            return res.send({ auth: false, message: 'Failed to authenticate token.' });
        }

        // se tudo estiver ok salva no req para usos posteriores
        req.userId = decoded.id;
        return next();
    });
}

router.get('/', verifyJWT, projetosController.listProjeto);
router.post('/', verifyJWT, projetosController.createProjeto);
router.put('/:id', verifyJWT, projetosController.updateProjeto);
router.delete('/:id', verifyJWT, projetosController.deleteProjeto);

module.exports = router;