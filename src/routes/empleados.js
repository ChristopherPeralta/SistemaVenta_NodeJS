const express=require('express');
const empleadoController = require('../controllers/empleadoController')

const router = express.Router();

router.get('/empleados',empleadoController.index);
router.get('/empleados/create',empleadoController.create);
router.post('/empleados',empleadoController.save);
router.get('/empleados/:id/edit', empleadoController.edit);
router.post('/empleados/:id/update', empleadoController.update);
router.post('/empleados/:id/delete', empleadoController.delete);

module.exports=router;