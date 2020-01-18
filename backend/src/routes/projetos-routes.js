const express = require('express');
const router = express.Router();
const projetosController = require('../controllers/projetos-controller');

router.get('/', projetosController.listProjetos);
router.post('/', projetosController.createProjeto);
router.put('/', projetosController.updateProjeto);
router.delete('/:id', projetosController.deleteProjeto);

module.exports = router;