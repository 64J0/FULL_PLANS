const express = require('express');
const router = express.Router();
const projetosController = require('../controllers/projetos-controller');
//const projetosGetsController = require('../controllers/projetos-gets-controller');

router.get('/', projetosController.listProjeto);
router.post('/', projetosController.createProjeto);
router.put('/:id', projetosController.updateProjeto);
router.delete('/:id', projetosController.deleteProjeto);
//router.get('/arquivados', projetosGetsController.listArquivados);

module.exports = router;