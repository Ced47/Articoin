const express = require('express');
const producterController = require('../controllers/producterController');
const { authenticate, authorize } = require('../middlewares/auth');

const router = express.Router();

router.use(authenticate, authorize('staff', 'superstaff'));

router.get('/producters', producterController.getProducters);
router.get('/producter/:id', producterController.getProducter);
router.get('/producter/product/:id', producterController.getProductsByProducter);
router.post('/producter', producterController.createProducter);
router.put('/producter/:id', producterController.updateProducter);
router.delete('/producter/:id', producterController.deleteProducter);

module.exports = router;