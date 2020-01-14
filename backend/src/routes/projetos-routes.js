const express = require('express');
const router = express.Router();
const projetosController = require('../controllers/projetos-controller');

router.get('/', projetosController.listNomeEmpresa);
router.post('/', projetosController.createNomeEmpresa);
router.put('/:id', projetosController.updateNomeEmpresa);
router.delete('/:id', projetosController.deleteNomeEmpresa);

module.exports = router;