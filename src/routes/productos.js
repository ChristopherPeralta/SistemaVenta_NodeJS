const express=require('express');
const productoController = require('../controllers/productoController')

const router = express.Router();

router.get('/productos',productoController.index);
router.get('/productos/create',productoController.create);
router.post('/productos',productoController.save);
router.get('/productos/:id/edit', productoController.edit);
router.post('/productos/:id/update', productoController.update);
router.post('/productos/:id/delete', productoController.delete);

module.exports=router;