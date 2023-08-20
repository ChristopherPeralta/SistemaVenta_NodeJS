const express=require('express');
const clienteController = require('../controllers/clienteController')

const router = express.Router();

router.get('/clientes',clienteController.index);
router.get('/clientes/create',clienteController.create);
router.post('/clientes',clienteController.save);
router.get('/clientes/:id/edit', clienteController.edit);
router.post('/clientes/:id/update', clienteController.update);
router.post('/clientes/:id/delete', clienteController.delete);

module.exports=router;