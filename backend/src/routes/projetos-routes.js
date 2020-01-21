const express = require('express');
const router = express.Router();
const projetosController = require('../controllers/projetos-controller');

router.get('/', projetosController.listProjeto);
router.post('/', projetosController.createProjeto);
router.put('/:id', projetosController.updateProjeto);
router.delete('/:id', projetosController.deleteProjeto);

module.exports = router;