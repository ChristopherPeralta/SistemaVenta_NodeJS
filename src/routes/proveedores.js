const express=require('express');
const proveedorController = require('../controllers/proveedorController')

const router = express.Router();

router.get('/proveedores',proveedorController.index);
router.get('/proveedores/create',proveedorController.create);
router.post('/proveedores',proveedorController.save);
router.get('/proveedores/:id/edit', proveedorController.edit);
router.post('/proveedores/:id/update', proveedorController.update);
router.post('/proveedores/:id/delete', proveedorController.delete);

module.exports=router;